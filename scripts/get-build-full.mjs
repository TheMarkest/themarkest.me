import { readFileSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

const cfg = JSON.parse(readFileSync(join(homedir(), ".config", "configstore", "firebase-tools.json"), "utf8"));
const at = (await (await fetch("https://oauth2.googleapis.com/token", {
  method: "POST",
  headers: { "content-type": "application/x-www-form-urlencoded" },
  body: new URLSearchParams({
    client_id: "563584335869-fgrhgmd47bqnekij5i8b5pr03ho849e6.apps.googleusercontent.com",
    client_secret: "j9iVZfS8kkCEFUPaAeJV0sAi",
    refresh_token: cfg.tokens.refresh_token,
    grant_type: "refresh_token",
  }),
})).json()).access_token;

const buildId = process.argv[2] || "c63fc1be-b342-4c8b-9ba0-5890651cde30";
const r = await fetch(
  `https://cloudbuild.googleapis.com/v1/projects/themarkestmesite/locations/europe-west4/builds/${buildId}`,
  { headers: { authorization: `Bearer ${at}` } }
);
const b = await r.json();
writeFileSync("build-full.json", JSON.stringify(b, null, 2));
console.log("Saved to build-full.json. Top-level keys:", Object.keys(b));
console.log("\n--- options ---");
console.log(JSON.stringify(b.options, null, 2));
console.log("\n--- artifacts ---");
console.log(JSON.stringify(b.artifacts || {}, null, 2));
console.log("\n--- substitutions ---");
console.log(JSON.stringify(b.substitutions || {}, null, 2));
console.log("\n--- step 3 ---");
console.log(JSON.stringify(b.steps?.[3] || {}, null, 2));
