import { copyFile, cp, mkdir, rm } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const webRoot = resolve(root, "apps/web");
const sharedRoot = resolve(root, "packages/shared/src");
const distRoot = resolve(root, "dist/web");

await rm(distRoot, { recursive: true, force: true });
await mkdir(resolve(distRoot, "src"), { recursive: true });
await mkdir(resolve(distRoot, "shared"), { recursive: true });

await copyFile(resolve(webRoot, "index.html"), resolve(distRoot, "index.html"));
await copyFile(resolve(webRoot, "src/app.js"), resolve(distRoot, "src/app.js"));
await copyFile(resolve(webRoot, "src/styles.css"), resolve(distRoot, "src/styles.css"));
await copyFile(resolve(sharedRoot, "index.js"), resolve(distRoot, "shared/index.js"));
await copyFile(resolve(webRoot, "index.html"), resolve(distRoot, "404.html"));

await cp(resolve(root, "doc"), resolve(distRoot, "doc"), { recursive: true });

console.log(`Built static web dist at ${distRoot}`);
