import { createServer } from "node:http";
import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { dirname, extname, join, normalize } from "node:path";
import { Readable } from "node:stream";
import { fileURLToPath } from "node:url";
import worker from "./dist/server/index.js";

const rootDir = dirname(fileURLToPath(import.meta.url));
const port = Number(
  process.env.PORT ||
    process.env.NIXPACKS_PORT ||
    process.env.APP_PORT ||
    process.env.EASYPANEL_PORT ||
    3000,
);
const host = "0.0.0.0";
const clientDir = join(rootDir, "dist", "client");
const serverDir = join(rootDir, "dist", "server");
const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
};

function getStaticPath(url, rootDir = clientDir) {
  const pathname = decodeURIComponent(new URL(url).pathname);
  const normalized = normalize(pathname)
    .replace(/^[/\\]+/, "")
    .replace(/^(\.\.[/\\])+/, "");
  const filePath = join(rootDir, normalized);

  return filePath.startsWith(rootDir) ? filePath : null;
}

async function serveStaticFile(req, res, filePath) {
  try {
    const file = await stat(filePath);

    if (!file.isFile()) return false;

    res.writeHead(200, {
      "content-length": file.size,
      "content-type": contentTypes[extname(filePath)] || "application/octet-stream",
    });

    if (req.method === "HEAD") {
      res.end();
    } else {
      createReadStream(filePath).pipe(res);
    }
    return true;
  } catch {
    return false;
  }
}

function getRequestUrl(req) {
  const forwardedProto = req.headers["x-forwarded-proto"];
  const proto = Array.isArray(forwardedProto)
    ? forwardedProto[0]
    : forwardedProto || "http";
  const forwardedHost = req.headers["x-forwarded-host"];
  const requestHost = Array.isArray(forwardedHost)
    ? forwardedHost[0]
    : forwardedHost || req.headers.host || `localhost:${port}`;

  return `${proto}://${requestHost}${req.url || "/"}`;
}

function getRequestBody(req) {
  if (req.method === "GET" || req.method === "HEAD") return undefined;
  return Readable.toWeb(req);
}

const server = createServer(async (req, res) => {
  try {
    const url = getRequestUrl(req);
    const staticPath = getStaticPath(url);

    if ((req.method === "GET" || req.method === "HEAD") && staticPath) {
      if (await serveStaticFile(req, res, staticPath)) return;
      const serverStaticPath = getStaticPath(url, serverDir);
      if (serverStaticPath && (await serveStaticFile(req, res, serverStaticPath))) return;
    }

    const request = new Request(url, {
      method: req.method,
      headers: req.headers,
      body: getRequestBody(req),
      duplex: "half",
    });
    const response = await worker.fetch(request, {}, {});

    res.writeHead(response.status, Object.fromEntries(response.headers));

    if (response.body) {
      Readable.fromWeb(response.body).pipe(res);
    } else {
      res.end();
    }
  } catch (error) {
    console.error(error);
    res.writeHead(500, { "content-type": "text/plain; charset=utf-8" });
    res.end("Internal Server Error");
  }
});

server.on("error", (error) => {
  console.error("Server failed to start", error);
  process.exit(1);
});

server.listen(port, host, () => {
  console.log(
    JSON.stringify({
      message: "Server listening",
      url: `http://${host}:${port}`,
      port,
      env: {
        PORT: process.env.PORT || null,
        NIXPACKS_PORT: process.env.NIXPACKS_PORT || null,
        APP_PORT: process.env.APP_PORT || null,
        EASYPANEL_PORT: process.env.EASYPANEL_PORT || null,
      },
    }),
  );
});
