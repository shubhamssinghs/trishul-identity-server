import { execSync } from "child_process";
import process from "process";
import dotenv from "dotenv";
import readline from "readline";
import path from "path";
import fs from "fs";

import { sequelize } from "../config/sequelize";

dotenv.config();

function createSpinner(text: string) {
  const frames = ["|", "/", "-", "\\"];
  let i = 0;

  const interval = setInterval(() => {
    const frame = frames[i++ % frames.length];
    process.stdout.write(`\r${text} ${frame}`);
  }, 100);

  return (success = true, error?: any) => {
    clearInterval(interval);
    process.stdout.write("\r\x1b[K");
    if (success) {
      console.log(`${text}. ✅`);
    } else {
      console.log(`${text} ❌\n`, error);
    }
  };
}

async function confirmIfAlreadySetup() {
  if (process.env.PROJECT_SETUP_DONE === "true") {
    console.log(
      `\n⚠️  Project appears already setup. Re-running setup is safe for syncing.`
    );

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    const answer: string = await new Promise((resolve) =>
      rl.question("Do you want to continue? (Y/n): ", resolve)
    );
    rl.close();

    if (/^n(o)?$/i.test(answer.trim())) {
      console.log("🛑  Setup aborted — no changes made.");
      process.exit(0);
    }
  }
}

function setSetupDoneFlag() {
  const envPath = path.resolve(process.cwd(), ".env");
  let env = fs.readFileSync(envPath, "utf8");

  if (/^PROJECT_SETUP_DONE=/m.test(env)) {
    env = env.replace(/^PROJECT_SETUP_DONE=.*/m, "PROJECT_SETUP_DONE=true");
  } else {
    env += "\nPROJECT_SETUP_DONE=true\n";
  }

  fs.writeFileSync(envPath, env);
}

async function ensureNodeVersion() {
  const requiredMajorNodeVersion = 21;
  const currentMajorNodeVersion = parseInt(process.versions.node.split(".")[0]);

  if (currentMajorNodeVersion < requiredMajorNodeVersion) {
    console.error(
      `Node.js v${requiredMajorNodeVersion}+ is required. You have ${process.version}. ❌`
    );
    process.exit(1);
  }

  console.log(`Node.js version ${process.version} is valid. ✅`);
}

async function ensureProjectDependencies() {
  const spinnerStop = createSpinner("📦 Installing dependencies...");
  try {
    execSync("npm install", { stdio: "inherit" });
    spinnerStop(true);
  } catch (err) {
    spinnerStop(false, err);
    process.exit(1);
  }
}

function ensureEnvVars(vars: string[]) {
  const spinnerStop = createSpinner("📝 Checking environment variables...");
  const missing = vars.filter((v) => !process.env[v]);
  if (missing.length) {
    spinnerStop(false, "Missing: " + missing.join(", "));
    process.exit(1);
  }
  spinnerStop(true);
}

async function syncDatabase() {
  const spinnerStop = createSpinner("🔄 Syncing database schema...");
  try {
    await sequelize.sync({ alter: true }); // alter = smart-safe update
    spinnerStop(true);
  } catch (err) {
    spinnerStop(false, err);
    process.exit(1);
  }
}

const setup = async () => {
  console.log(`
    Trishul Identity Server CLI TOOL
─────────────────────────────────────────────`);

  await confirmIfAlreadySetup();
  await ensureNodeVersion();
  await ensureProjectDependencies();

  ensureEnvVars([
    "NODE_ENV",
    "APP_PORT",
    "DB_HOST",
    "DB_USER",
    "DB_PASSWORD",
    "DB_NAME",
    "ACCESS_TOKEN_SECRET",
    "REFRESH_TOKEN_SECRET",
  ]);

  await syncDatabase();
  setSetupDoneFlag();

  console.log(`
═════════════════════════════════════════════════════════════════════════════

✅ All done!                               
🥳 Hurray! Project setup is complete.       
🚀 You're ready to launch into development! 

═════════════════════════════════════════════════════════════════════════════
  `);

  process.exit(0);
};

setup();
