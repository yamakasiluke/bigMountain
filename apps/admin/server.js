import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, normalize, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("./", import.meta.url));
const sharedRoot = resolve(root, "../../packages/shared/src");
const port = Number(process.env.PORT ?? 5174);
const host = process.env.HOST ?? "127.0.0.1";

const server = createServer(async (request, response) => {
  const pathname = new URL(request.url ?? "/", `http://${request.headers.host}`).pathname;
  const filePath = mapPath(pathname);

  if (!filePath) {
    response.writeHead(404);
    response.end("Not found");
    return;
  }

  try {
    const fileStat = await stat(filePath);
    if (!fileStat.isFile()) throw new Error("Not a file");
    response.writeHead(200, { "Content-Type": mimeType(filePath) });
    createReadStream(filePath).pipe(response);
  } catch {
    response.writeHead(404);
    response.end("Not found");
  }
});

server.listen(port, host, () => {
  console.log(`BigMountain admin running at http://${host}:${port}`);
});

function mapPath(pathname) {
  if (pathname === "/") return resolve(root, "index.html");
  if (pathname.startsWith("/src/")) return safeResolve(root, pathname.slice(1));
  if (pathname === "/shared/index.js") return resolve(sharedRoot, "index.js");
  return null;
}

function safeResolve(base, relativePath) {
  const resolved = resolve(base, normalize(relativePath));
  return resolved.startsWith(base) ? resolved : null;
}

function mimeType(filePath) {
  return {
    ".html": "text/html; charset=utf-8",
    ".js": "text/javascript; charset=utf-8",
    ".css": "text/css; charset=utf-8"
  }[extname(filePath)] ?? "application/octet-stream";
}
