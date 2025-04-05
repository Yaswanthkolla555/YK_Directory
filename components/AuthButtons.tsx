"use client";

import { LogOut } from "lucide-react";
import { signIn, signOut } from "next-auth/react";

export const AuthButtons = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
    return isAuthenticated ? (
        <button onClick={() => signOut()} className="hover:text-gray-600">
            <span className="hover:text-gray-600 max-sm:hidden">LogOut</span>
            <LogOut className="size-6 sm:hidden test-red-500" />
        </button>
    ) : (
        <button onClick={() => signIn("github")} className="hover:text-gray-600">
            Login
        </button>
    );
};
