"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

import { supabase } from "@/lib/supabase";

type RealtimeWrapperProps = {
  table: string;
};

export default function RealtimeWrapper({
  table,
}: RealtimeWrapperProps) {

  const router =
    useRouter();

  useEffect(() => {

    const channel =
      supabase

        .channel(
          `${table}-channel`
        )

        .on(
          "postgres_changes",

          {
            event: "*",

            schema: "public",

            table,
          },

          () => {

            router.refresh();

          }
        )

        .subscribe();

    return () => {

      supabase.removeChannel(
        channel
      );

    };

  }, [router, table]);

  return null;

}