import { spawn } from "node:child_process";
import { createReadStream, watch } from "node:fs";
import { readdir, stat } from "node:fs/promises";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = path.join(root, "public");
const watchDirs = ["pages", "_includes", "assets"].map((dir) => path.join(root, dir));
const port = Number(process.env.PORT || 8888);
const host = process.env.HOST || "127.0.0.1";

let buildTimer;
let isBuilding = false;
let pendingBuild = false;

const mimeTypes = new Map([
  [".css", "text/css; charset=utf-8"],
  [".html", "text/html; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".svg", "image/svg+xml"],
  [".png", "image/png"],
  [".jpg", "image/jpeg"],
  [".jpeg", "image/jpeg"],
  [".webp", "image/webp"],
  [".woff", "font/woff"],
  [".woff2", "font/woff2"],
]);

function runBuild() {
  if (isBuilding) {
    pendingBuild = true;
    return;
  }

  isBuilding = true;
  const child = spawn(process.execPath, [path.join(root, "scripts", "build.mjs")], {
    stdio: "inherit",
  });

  child.on("exit", (code) => {
    isBuilding = false;
    if (code !== 0) {
      console.error(`Build failed with exit code ${code}`);
    }

    if (pendingBuild) {
      pendingBuild = false;
      runBuild();
    }
  });
}

function scheduleBuild() {
  clearTimeout(buildTimer);
  buildTimer = setTimeout(runBuild, 100);
}

async function resolveRequest(url) {
  const parsed = new URL(url, `http://${host}:${port}`);
  const pathname = decodeURIComponent(parsed.pathname);
  const cleanPath = path.normalize(pathname).replace(/^(\.\.[/\\])+/, "");
  let filePath = path.join(publicDir, cleanPath);

  if (!filePath.startsWith(publicDir)) {
    return null;
  }

  try {
    const fileStat = await stat(filePath);
    if (fileStat.isDirectory()) {
      filePath = path.join(filePath, "index.html");
    }
  } catch {
    if (!path.extname(filePath)) {
      filePath = path.join(filePath, "index.html");
    }
  }

  if (!filePath.startsWith(publicDir)) {
    return null;
  }

  return filePath;
}

const server = http.createServer(async (request, response) => {
  const filePath = await resolveRequest(request.url || "/");

  if (!filePath) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  createReadStream(filePath)
    .on("error", () => {
      response.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
      response.end("Not found");
    })
    .on("open", () => {
      response.writeHead(200, {
        "content-type": mimeTypes.get(path.extname(filePath)) || "application/octet-stream",
      });
    })
    .pipe(response);
});

for (const dir of watchDirs) {
  watch(dir, { recursive: true }, scheduleBuild);
}

runBuild();

server.listen(port, host, () => {
  console.log(`V2 local preview running at http://${host}:${port}`);
});
