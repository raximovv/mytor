// Minimal static server for dist/: clean URLs, trailing-slash redirects and real 404 pages.
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { join, normalize, extname, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const dist = join(dirname(fileURLToPath(import.meta.url)), "..", "dist");
const port = Number(process.env.PORT) || 4321;
const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".json": "application/json; charset=utf-8",
};

const isFile = async (p) => (await stat(p).catch(() => null))?.isFile() ?? false;
const isDir = async (p) => (await stat(p).catch(() => null))?.isDirectory() ?? false;

createServer(async (req, res) => {
  let path;
  try {
    path = decodeURIComponent(new URL(req.url, "http://x").pathname);
  } catch {
    res.writeHead(400).end("Bad request");
    return;
  }
  const file = normalize(join(dist, path));
  if (!file.startsWith(dist)) {
    res.writeHead(403).end();
    return;
  }
  let target = null;
  if (path.endsWith("/") && (await isFile(join(file, "index.html")))) target = join(file, "index.html");
  else if (!path.endsWith("/") && (await isFile(file))) target = file;
  else if (!path.endsWith("/") && (await isDir(file)) && (await isFile(join(file, "index.html")))) {
    res.writeHead(301, { Location: path + "/" }).end();
    return;
  }
  const status = target ? 200 : 404;
  if (!target) target = join(dist, path.startsWith("/ru/") || path === "/ru" ? "ru/404.html" : "404.html");
  const body = await readFile(target);
  res.writeHead(status, { "Content-Type": TYPES[extname(target)] || "application/octet-stream", "Cache-Control": "no-cache" });
  res.end(req.method === "HEAD" ? undefined : body);
}).listen(port, () => console.log(`Mytor site: http://localhost:${port}/`));
