import StartUpForm from "@/components/StartUpForm";
import { authOptions } from "@/auth.config";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";

const Page = async () => {
const session = await getServerSession(authOptions);

  if (!session) redirect("/");

  return (
    <>
      <section className="pink_container !min-h-[230px]">
        <h1 className="heading">Create Your Startup Data</h1>
      </section>

      <StartUpForm />
    </>
  );
};

export default Page;