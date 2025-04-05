import GithubProvider from "next-auth/providers/github";
import { client } from "./sanity/lib/client";
import { AUTHOR_BY_GITHUB_ID_QUERY } from "./sanity/lib/queries";
import { writeClient } from "./sanity/lib/write-client";

// Define GitHub profile type
interface GitHubProfile {
  id: string;
  login: string;
  bio?: string;
}

// Define user type
interface User {
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

export const authOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.AUTH_GITHUB_ID!,
            clientSecret: process.env.AUTH_GITHUB_SECRET!,
        }),
    ],
    callbacks: {
        async signIn(params: any) {
            const { user, profile } = params;
            // Type assertion for GitHub profile
            const githubProfile = profile as GitHubProfile;
            
            const existingUser = await client
              .withConfig({ useCdn: false })
              .fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
                id: githubProfile.id,
              });
      
            if (!existingUser) {
              const newUser = await writeClient.create({
                _type: "author",
                id: githubProfile.id,
                name: user.name,
                username: githubProfile.login,
                email: user.email,
                image: user.image,
                bio: githubProfile.bio || "",
              });
              return true;
            }
      
            return true;
          },
          async jwt(params: any) {
            const { token, account, profile } = params;
            if (account && profile) {
              // Type assertion for GitHub profile
              const githubProfile = profile as GitHubProfile;
              
              const user = await client
                .withConfig({ useCdn: false })
                .fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
                  id: githubProfile.id,
                });
      
              if (user) {
                token.id = user._id;
                token.userId = user._id; // Add userId for redundancy
                console.log("Setting token ID:", user._id);
              }
            }
            console.log("JWT callback - token:", token);
            return token;
          },
          async session(params: any) {
            const { session, token } = params;
            console.log("Session callback - token:", token);
            
            // Ensure the ID is set on both the session and user object
            session.id = token.id || token.userId;
            if (session.user) {
              session.user.id = token.id || token.userId;
            }
            
            console.log("Session callback - final session:", session);
            return session;
          },
    },
}; 