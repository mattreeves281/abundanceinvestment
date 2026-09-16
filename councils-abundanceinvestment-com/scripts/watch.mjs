import { spawn } from "node:child_process";
import { readdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const watchTargets = ["src", "_includes", "css", "js", "img"].map((dir) => path.join(root, dir));

let buildProcess = null;
let lastSignature = "";
let pending = false;

async function getSignature(targets) {
  const entries = [];

  async function walk(target) {
    const items = await readdir(target, { withFileTypes: true });

    for (const item of items) {
      if (item.name === ".DS_Store") continue;

      const itemPath = path.join(target, item.name);

      if (item.isDirectory()) {
        await walk(itemPath);
        continue;
      }

      const details = await stat(itemPath);
      entries.push(`${path.relative(root, itemPath)}:${details.mtimeMs}:${details.size}`);
    }
  }

  for (const target of targets) {
    try {
      await walk(target);
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
    }
  }

  return entries.sort().join("\n");
}

function runBuild() {
  if (buildProcess) {
    pending = true;
    return;
  }

  buildProcess = spawn(process.execPath, [path.join(root, "scripts/build.mjs")], {
    cwd: root,
    stdio: "inherit"
  });

  buildProcess.on("exit", () => {
    buildProcess = null;

    if (pending) {
      pending = false;
      runBuild();
    }
  });
}

async function checkForChanges() {
  const signature = await getSignature(watchTargets);

  if (signature !== lastSignature) {
    lastSignature = signature;
    runBuild();
  }
}

await checkForChanges();
setInterval(() => {
  checkForChanges().catch((error) => {
    console.error(error);
  });
}, 1000);

console.log("Watching council site source files. Press Ctrl-C to stop.");
