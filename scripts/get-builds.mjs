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

const base = "https://firebaseapphosting.googleapis.com/v1beta/projects/themarkestmesite/locations/europe-west4/backends/themarkestme";

const builds = await (await fetch(`${base}/builds?pageSize=10`, {
  headers: { authorization: `Bearer ${at}` },
})).json();
console.log("=== BUILDS ===");
for (const b of builds.builds || []) {
  console.log(b.name?.split("/").pop(), "->", b.state, "|", b.error?.message || "(no err)", "|", b.buildLogsUri || "");
  if (b.error) console.log("  ERROR:", JSON.stringify(b.error, null, 2).slice(0, 1500));
}

const rollouts = await (await fetch(`${base}/rollouts?pageSize=10`, {
  headers: { authorization: `Bearer ${at}` },
})).json();
console.log("\n=== ROLLOUTS ===");
for (const r of rollouts.rollouts || []) {
  console.log(r.name?.split("/").pop(), "->", r.state, "|", r.stateDetail || "(no detail)");
}
