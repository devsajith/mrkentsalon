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
      className="mt-10 text-red-400"
    >
      Logout
    </button>

  );

}