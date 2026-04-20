import { readFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

const cfgPath = join(homedir(), ".config", "configstore", "firebase-tools.json");
const cfg = JSON.parse(readFileSync(cfgPath, "utf8"));
const tokens = cfg.tokens;
if (!tokens?.refresh_token) {
  console.error("No refresh_token in configstore");
  process.exit(1);
}

// Refresh access token
const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
  method: "POST",
  headers: { "content-type": "application/x-www-form-urlencoded" },
  body: new URLSearchParams({
    client_id: "563584335869-fgrhgmd47bqnekij5i8b5pr03ho849e6.apps.googleusercontent.com",
    client_secret: "j9iVZfS8kkCEFUPaAeJV0sAi",
    refresh_token: tokens.refresh_token,
    grant_type: "refresh_token",
  }),
});
const tj = await tokenRes.json();
if (!tj.access_token) {
  console.error("Token refresh failed:", JSON.stringify(tj));
  process.exit(1);
}
const at = tj.access_token;

const buildId = process.argv[2] || "c63fc1be-b342-4c8b-9ba0-5890651cde30";
const r = await fetch(
  `https://cloudbuild.googleapis.com/v1/projects/themarkestmesite/locations/europe-west4/builds/${buildId}`,
  { headers: { authorization: `Bearer ${at}` } }
);
const b = await r.json();
console.log("STATUS:", b.status);
console.log("LOGS_BUCKET:", b.logsBucket);
console.log("LOG_URL:", b.logUrl);
if (b.failureInfo) console.log("FAILURE:", JSON.stringify(b.failureInfo, null, 2));
if (b.steps) {
  for (const [i, s] of b.steps.entries()) {
    console.log(`STEP ${i}`, (s.id || s.name || "").slice(0, 70), "->", s.status || "?");
  }
}

// Try fetch the log file from GCS
if (b.logsBucket) {
  const bucket = b.logsBucket.replace("gs://", "");
  const obj = `log-${buildId}.txt`;
  const lr = await fetch(
    `https://storage.googleapis.com/storage/v1/b/${bucket}/o/${encodeURIComponent(obj)}?alt=media`,
    { headers: { authorization: `Bearer ${at}` } }
  );
  if (lr.ok) {
    const text = await lr.text();
    console.log("\n========== LAST 6000 CHARS OF LOG ==========\n");
    console.log(text.slice(-6000));
  } else {
    console.log("Log fetch failed:", lr.status, await lr.text());
  }
}
