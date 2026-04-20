"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { firebaseApp, getAnalyticsSafe } from "@/lib/firebase/client";

export default function FirebaseAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (!firebaseApp) return;
    getAnalyticsSafe();
  }, []);

  useEffect(() => {
    if (!firebaseApp || !pathname) return;
    let cancelled = false;
    (async () => {
      const analytics = await getAnalyticsSafe();
      if (cancelled || !analytics) return;
      const { logEvent } = await import("firebase/analytics");
      logEvent(analytics, "page_view", {
        page_path: pathname,
        page_location: typeof window !== "undefined" ? window.location.href : undefined,
      });
    })();
    return () => {
      cancelled = true;
    };
  }, [pathname]);

  return null;
}
