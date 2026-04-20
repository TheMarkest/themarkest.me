import { readFileSync } from "node:fs";
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
const filters = [
  `resource.type="build" AND resource.labels.build_id="${buildId}"`,
  `resource.type="build"`,
  `"${buildId}"`,
];
for (const filter of filters) {
  console.log(`\n========== FILTER: ${filter} ==========`);
  const r = await fetch("https://logging.googleapis.com/v2/entries:list", {
    method: "POST",
    headers: { authorization: `Bearer ${at}`, "content-type": "application/json" },
    body: JSON.stringify({
      resourceNames: ["projects/themarkestmesite"],
      filter,
      orderBy: "timestamp desc",
      pageSize: 30,
    }),
  });
  const j = await r.json();
  if (j.error) { console.log("ERR:", j.error.message); continue; }
  if (!j.entries) { console.log("(no entries)"); continue; }
  console.log(`Found ${j.entries.length} entries`);
  for (const e of j.entries.slice(0, 30)) {
    const t = e.textPayload || (e.jsonPayload?.message) || JSON.stringify(e.jsonPayload || e.protoPayload || {}).slice(0, 300);
    console.log(`[${e.severity || "?"}]`, t);
  }
  if (j.entries.length > 0) break;
}
