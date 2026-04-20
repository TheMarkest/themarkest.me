import { getApps, initializeApp, type FirebaseApp } from "firebase/app";

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

export const firebaseApp: FirebaseApp | null = config.apiKey
  ? (getApps()[0] ?? initializeApp(config as Record<string, string>))
  : null;

export async function getAnalyticsSafe() {
  if (typeof window === "undefined" || !firebaseApp) return null;
  const { getAnalytics, isSupported } = await import("firebase/analytics");
  try {
    if (await isSupported()) return getAnalytics(firebaseApp);
  } catch {
    /* ignore */
  }
  return null;
}
