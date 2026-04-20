import "server-only";

import {
  getApps,
  initializeApp,
  applicationDefault,
  cert,
  type App,
} from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";

function init(): App | null {
  if (getApps().length) return getApps()[0]!;
  try {
    if (process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
      return initializeApp({
        credential: cert(
          JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON),
        ),
      });
    }
    if (
      process.env.GOOGLE_APPLICATION_CREDENTIALS ||
      process.env.FIREBASE_CONFIG ||
      process.env.K_SERVICE
    ) {
      return initializeApp({ credential: applicationDefault() });
    }
  } catch (e) {
    console.warn("[firebase-admin] init failed:", e);
  }
  return null;
}

export const adminApp: App | null = init();
export const adminDb: Firestore | null = adminApp
  ? getFirestore(adminApp)
  : null;
