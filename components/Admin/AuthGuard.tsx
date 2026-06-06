"use client";

import { useEffect } from "react";

import { useRouter }
from "next/navigation";

import { getCurrentUser }
from "@/services/auth.services";

export default function AuthGuard({
  children,
}: {
  children: React.ReactNode;
}) {

  const router =
    useRouter();

  useEffect(() => {

    async function check() {

      const { data } =
        await getCurrentUser();

      if (!data.user) {

        router.push(
          "/login"
        );

      }

    }

    check();

  }, [router]);

  return <>{children}</>;

}