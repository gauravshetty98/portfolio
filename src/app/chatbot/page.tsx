"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ChatbotRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/");
  }, [router]);

  return null;
}
