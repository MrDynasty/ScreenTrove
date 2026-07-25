import { createReadStream, statSync } from "node:fs";
import { extname, join, normalize, resolve } from "node:path";
import { createServer } from "node:http";

const root = resolve(import.meta.dirname, "../site");
const port = Number(process.env.PORT || 4173);
const mime = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
};

createServer((request, response) => {
  const pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
  const safePath = normalize(pathname).replace(/^(\.\.(\/|\\|$))+/, "");
  let file = join(root, safePath);

  try {
    if (statSync(file).isDirectory()) file = join(file, "index.html");
    if (!file.startsWith(root) || !statSync(file).isFile()) throw new Error();
    response.writeHead(200, {
      "Content-Type": mime[extname(file)] || "application/octet-stream",
      "Cache-Control": "no-cache",
    });
    createReadStream(file).pipe(response);
  } catch {
    response.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
    createReadStream(join(root, "404.html")).pipe(response);
  }
}).listen(port, "127.0.0.1", () => {
  console.log(`ALC-001 preview: http://localhost:${port}/`);
});
