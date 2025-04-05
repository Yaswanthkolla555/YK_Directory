import Link from 'next/link';
import Image from 'next/image';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth.config";
import { AuthButtons } from "./AuthButtons"; // Import the client component
import { BadgePlus } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

interface SessionWithId {
  user?: {
    id?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
  id?: string;
}

const Navbar = async () => {
    const session = await getServerSession(authOptions) as SessionWithId;
    const userId = session?.id || session?.user?.id;
    
    // Debug session
    console.log("Navbar Session:", JSON.stringify(session, null, 2));
    console.log("User ID:", userId);

    return (
        <header className='px-5 py-3 bg-white shadow-sm font-work-sans'>
            <nav className='flex justify-between items-center'>
                <Link href="/">
                    <span className="text-2xl font-extrabold">
                        <span className="text-[#EE2B69]">YK</span>
                        <span className="text-black">Directory</span>
                    </span>
                </Link>
                <div className="flex items-center gap-5 text-black">
                    {session?.user ? (
                        <>
                            <Link href="/startup/create">
                                <span className="hover:text-gray-600 max-sm:hidden">Create</span>
                                <BadgePlus className='size-6 sm:hidden' />
                            </Link>
                            {userId ? (
                                <Link href={`/user/${userId}`}>
                                    {/* <span className="hover:text-gray-600">{session.user.name}</span> */}
                                    <Avatar className='size-8'>
                                        <AvatarImage src={session?.user?.image || ""} alt={session?.user?.name || " "} />
                                        <AvatarFallback>AV</AvatarFallback>
                                    </Avatar>
                                </Link>
                            ) : (
                                <span className="text-gray-400">Loading profile...</span>
                            )}
                        </>
                    ) : null}

                    <AuthButtons isAuthenticated={!!session?.user} />
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
