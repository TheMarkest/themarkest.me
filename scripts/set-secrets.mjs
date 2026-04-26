#!/usr/bin/env node
/**
 * Helper: reads .env.local and uploads each secret value to
 * Google Cloud Secret Manager via firebase CLI.
 *
 * Usage:
 *   npm run deploy:secrets
 */
import { execSync } from "child_process";
import { readFileSync, existsSync, writeFileSync, unlinkSync, mkdtempSync } from "fs";
import { tmpdir } from "os";
import { resolve, join } from "path";

const ENV_FILE = resolve(process.cwd(), ".env.local");

if (!existsSync(ENV_FILE)) {
  console.error("ERROR: .env.local not found.");
  process.exit(1);
}

const raw = readFileSync(ENV_FILE, "utf-8");

const entries = raw
  .split("\n")
  .map((l) => l.trim())
  .filter((l) => l && !l.startsWith("#"))
  .map((l) => {
    const i = l.indexOf("=");
    if (i === -1) return null;
    return {
      key: l.slice(0, i).trim(),
      value: l.slice(i + 1).trim().replace(/^["']|["']$/g, ""),
    };
  })
  .filter(Boolean);

const SECRET_KEYS = [
  "NEXT_PUBLIC_FIREBASE_API_KEY",
  "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN",
  "NEXT_PUBLIC_FIREBASE_PROJECT_ID",
  "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET",
  "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID",
  "NEXT_PUBLIC_FIREBASE_APP_ID",
];

const toUpload = entries.filter(
  ({ key, value }) => SECRET_KEYS.includes(key) && value,
);

if (toUpload.length === 0) {
  console.error("ERROR: no matching secret keys found in .env.local.");
  process.exit(1);
}

const dir = mkdtempSync(join(tmpdir(), "fb-secrets-"));

console.log(`\nUploading ${toUpload.length} secrets to Secret Manager...\n`);

for (const { key, value } of toUpload) {
  const tmp = join(dir, key);
  writeFileSync(tmp, value, { encoding: "utf-8" });
  try {
    execSync(`npx firebase apphosting:secrets:set ${key} --data-file "${tmp}" --force`, {
      stdio: ["ignore", "inherit", "inherit"],
      shell: true,
    });
    console.log(`  OK  ${key}`);
  } catch {
    console.error(`  FAIL ${key}`);
  } finally {
    try { unlinkSync(tmp); } catch {}
  }
}

console.log("\nDone. Next:");
console.log("  npx firebase apphosting:secrets:grantaccess --backend themarkestme\n");
