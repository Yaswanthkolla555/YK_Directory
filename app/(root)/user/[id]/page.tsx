import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth.config";
import { client } from "@/sanity/lib/client";
import { AUTHOR_BY_ID_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import Image from "next/image";
import UserStartUps from "@/components/UserStartUps";
import { Suspense } from "react";
import StartupCardSkeleton from "@/components/StartupCardSkeleton";

export const experimental_ppr = true;

interface SessionWithId {
  id?: string;
  user?: {
    id?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const session = await getServerSession(authOptions) as SessionWithId;

  // console.log("Session in user profile:", session);
  // console.log("User ID from params:", id);
  // console.log("Session ID:", session?.id);
  // console.log("User ID from session:", session?.user?.id);

  const user = await client.fetch(AUTHOR_BY_ID_QUERY, { id });
  if (!user) return notFound();

  const isCurrentUser = session?.id === id || session?.user?.id === id;

  return (
    <>
      <section className="profile_container">
        <div className="profile_card !bg-[#EE2B69]">
          <div className="profile_title">
            <h3 className="text-24-black uppercase text-center line-clamp-1">
              {user.name}
            </h3>
          </div>

          <Image
            src={user.image}
            alt={user.name}
            width={220}
            height={220}
            className="profile_image"
          />

          <p className="text-30-extrabold mt-7 text-center">
            @{user?.username}
          </p>
          <p className="mt-1 text-center text-14-normal">{user?.bio}</p>
        </div>

        <div className="flex-1 flex flex-col gap-5 lg:-mt-5">
          <p className="text-30-bold">
            {isCurrentUser ? "Your" : "All"} Startups
          </p>
          <ul className="card_grid-sm">
            <Suspense fallback={<StartupCardSkeleton />}>
              <UserStartUps id={id} />
            </Suspense>
          </ul>
        </div>
      </section>
    </>
  );
};

export default Page;