import NextAuth from "next-auth/next";
import { authOptions } from "./auth.config";

// Export the NextAuth handlers
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

// Export auth function
export const auth = async () => {
  const session = await handler.auth();
  return session;
};
