"use client";

import { useRouter }
from "next/navigation";

import { signOut }
from "@/services/auth.services";

export default function LogoutButton() {

  const router =
    useRouter();

  async function logout() {

    await signOut();

    router.push(
      "/login"
    );

  }

  return (
    <button
      onClick={logout}
      className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-sm font-semibold transition-all text-red-400 hover:text-red-300 hover:bg-white/5 cursor-pointer"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
      </svg>
      Logout
    </button>
  );

}