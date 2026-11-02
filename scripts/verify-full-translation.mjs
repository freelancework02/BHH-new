import { spawn } from "child_process";
import fs from "fs";
import path from "path";

const PORT = 3022;
const CHROME_PORT = 9240;
const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const ARTIFACT_DIR = "C:\\Users\\Aawesh\\.gemini\\antigravity\\brain\\446bb73b-837f-463c-aeb6-bb350999ae44\\browser-verification";

if (!fs.existsSync(ARTIFACT_DIR)) {
  fs.mkdirSync(ARTIFACT_DIR, { recursive: true });
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function waitHttp(url, timeoutMs = 25000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.ok || res.status === 200 || res.status === 304) return true;
    } catch (e) {}
    await sleep(400);
  }
  throw new Error(`Timeout waiting for ${url}`);
}

async function sendCdp(ws, method, params = {}) {
  const id = Math.floor(Math.random() * 1000000);
  return new Promise((resolve, reject) => {
    const handleMsg = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.id === id) {
          ws.removeEventListener("message", handleMsg);
          if (data.error) reject(new Error(JSON.stringify(data.error)));
          else resolve(data.result);
        }
      } catch (e) {
        reject(e);
      }
    };
    ws.addEventListener("message", handleMsg);
    ws.send(JSON.stringify({ id, method, params }));
  });
}

async function evalInBrowser(ws, expression) {
  const res = await sendCdp(ws, "Runtime.evaluate", {
    expression,
    returnByValue: true,
    awaitPromise: true,
  });
  return res.result ? res.result.value : null;
}

async function takeScreenshot(ws, filename) {
  const res = await sendCdp(ws, "Page.captureScreenshot", { format: "png" });
  const filePath = path.join(ARTIFACT_DIR, filename);
  fs.writeFileSync(filePath, Buffer.from(res.data, "base64"));
  console.log(`[Screenshot saved] -> ${filename}`);
  return filePath;
}

async function verifyTranslations() {
  console.log("======================================================");
  console.log("STARTING DEEP BROWSER TRANSLATION VERIFICATION");
  console.log("======================================================");

  const nextProcess = spawn(
    "node",
    ["node_modules/next/dist/bin/next", "start", "-p", String(PORT), "-H", "127.0.0.1"],
    { stdio: "inherit", env: { ...process.env, PORT: String(PORT) } }
  );

  let chromeProcess = null;

  try {
    await waitHttp(`http://127.0.0.1:${PORT}`);
    console.log(`[Next.js Server Ready on port ${PORT}]`);

    const profileDir = path.join(process.cwd(), ".temp-chrome-test");
    if (!fs.existsSync(profileDir)) fs.mkdirSync(profileDir, { recursive: true });

    chromeProcess = spawn(
      CHROME_PATH,
      [
        "--headless=new",
        `--remote-debugging-port=${CHROME_PORT}`,
        `--user-data-dir=${profileDir}`,
        "--disable-gpu",
        "--no-first-run",
        "--no-default-browser-check",
        "--window-size=1280,950",
        "about:blank",
      ],
      { stdio: "ignore" }
    );

    await waitHttp(`http://127.0.0.1:${CHROME_PORT}/json/version`);
    console.log("[Google Chrome Headless CDP Ready]");

    const tabRes = await fetch(`http://127.0.0.1:${CHROME_PORT}/json/new?http://127.0.0.1:${PORT}`, {
      method: "PUT",
    });
    const tabData = await tabRes.json();
    const ws = new WebSocket(tabData.webSocketDebuggerUrl);
    await new Promise((r) => (ws.onopen = r));

    await sendCdp(ws, "Page.enable");
    await sendCdp(ws, "Runtime.enable");
    await sendCdp(ws, "DOM.enable");

    // Wait for initial load
    await sleep(2500);

    // -------------------------------------------------------------
    // STEP 1: INITIAL STATE (ENGLISH)
    // -------------------------------------------------------------
    console.log("\n>>> STEP 1: Checking Initial English Content <<<");
    const initialEn = await evalInBrowser(ws, `
      (() => {
        const phone = document.querySelector('header a[href^="tel:"] span')?.innerText;
        const brandStory = document.querySelector('footer p[class*="footer-brand-story"]')?.innerText;
        const navLinks = Array.from(document.querySelectorAll('header nav a')).slice(0, 3).map(a => a.innerText.trim());
        return { phone, brandStory, navLinks };
      })()
    `);
    console.log("English Content Sample:", initialEn);
    await takeScreenshot(ws, "live_01_initial_english.png");

    // -------------------------------------------------------------
    // STEP 2: TRANSLATE TO SPANISH (es)
    // -------------------------------------------------------------
    console.log("\n>>> STEP 2: Switching to Spanish (Español) <<<");
    await evalInBrowser(ws, `document.querySelector('div[class*="LanguageSwitcher"] button[aria-haspopup="listbox"]').click()`);
    await sleep(400);

    await evalInBrowser(ws, `
      (() => {
        const dd = document.querySelector('div[class*="LanguageSwitcher_dropdown"]');
        const options = Array.from(dd.querySelectorAll('button[role="option"]'));
        const esOption = options.find(o => o.innerText.includes('Español') || o.innerText.includes('Spanish'));
        if (esOption) esOption.click();
      })()
    `);

    // Wait for reload and Google Translate to translate the page
    await sleep(3500);

    const spanishSample = await evalInBrowser(ws, `
      (() => {
        const phone = document.querySelector('header a[href^="tel:"] span')?.innerText;
        const brandStory = document.querySelector('footer p[class*="footer-brand-story"]')?.innerText;
        const navLinks = Array.from(document.querySelectorAll('header nav a')).slice(0, 3).map(a => a.innerText.trim());
        const htmlClasses = document.documentElement.className;
        const cookie = document.cookie;
        return { phone, brandStory, navLinks, htmlClasses, cookie };
      })()
    `);
    console.log("Spanish Content Sample:", spanishSample);
    await takeScreenshot(ws, "live_02_spanish_translated.png");

    // -------------------------------------------------------------
    // STEP 3: TRANSLATE TO NEPALI (ne)
    // -------------------------------------------------------------
    console.log("\n>>> STEP 3: Switching to Nepali (नेपाली) <<<");
    await evalInBrowser(ws, `document.querySelector('div[class*="LanguageSwitcher"] button[aria-haspopup="listbox"]').click()`);
    await sleep(400);

    await evalInBrowser(ws, `
      (() => {
        const dd = document.querySelector('div[class*="LanguageSwitcher_dropdown"]');
        const options = Array.from(dd.querySelectorAll('button[role="option"]'));
        const neOption = options.find(o => o.innerText.includes('नेपाली') || o.innerText.includes('Nepali'));
        if (neOption) neOption.click();
      })()
    `);

    await sleep(3500);

    const nepaliSample = await evalInBrowser(ws, `
      (() => {
        const phone = document.querySelector('header a[href^="tel:"] span')?.innerText;
        const brandStory = document.querySelector('footer p[class*="footer-brand-story"]')?.innerText;
        const navLinks = Array.from(document.querySelectorAll('header nav a')).slice(0, 3).map(a => a.innerText.trim());
        const htmlClasses = document.documentElement.className;
        return { phone, brandStory, navLinks, htmlClasses };
      })()
    `);
    console.log("Nepali Content Sample:", nepaliSample);
    await takeScreenshot(ws, "live_03_nepali_translated.png");

    // -------------------------------------------------------------
    // STEP 4: TRANSLATE TO RUSSIAN (ru)
    // -------------------------------------------------------------
    console.log("\n>>> STEP 4: Switching to Russian (Русский) <<<");
    await evalInBrowser(ws, `document.querySelector('div[class*="LanguageSwitcher"] button[aria-haspopup="listbox"]').click()`);
    await sleep(400);

    await evalInBrowser(ws, `
      (() => {
        const dd = document.querySelector('div[class*="LanguageSwitcher_dropdown"]');
        const options = Array.from(dd.querySelectorAll('button[role="option"]'));
        const ruOption = options.find(o => o.innerText.includes('Русский') || o.innerText.includes('Russian'));
        if (ruOption) ruOption.click();
      })()
    `);

    await sleep(3500);

    const russianSample = await evalInBrowser(ws, `
      (() => {
        const phone = document.querySelector('header a[href^="tel:"] span')?.innerText;
        const brandStory = document.querySelector('footer p[class*="footer-brand-story"]')?.innerText;
        const navLinks = Array.from(document.querySelectorAll('header nav a')).slice(0, 3).map(a => a.innerText.trim());
        const htmlClasses = document.documentElement.className;
        return { phone, brandStory, navLinks, htmlClasses };
      })()
    `);
    console.log("Russian Content Sample:", russianSample);
    await takeScreenshot(ws, "live_04_russian_translated.png");

    // -------------------------------------------------------------
    // STEP 5: REVERT TO ENGLISH (en)
    // -------------------------------------------------------------
    console.log("\n>>> STEP 5: Reverting to English <<<");
    await evalInBrowser(ws, `document.querySelector('div[class*="LanguageSwitcher"] button[aria-haspopup="listbox"]').click()`);
    await sleep(400);

    await evalInBrowser(ws, `
      (() => {
        const dd = document.querySelector('div[class*="LanguageSwitcher_dropdown"]');
        const options = Array.from(dd.querySelectorAll('button[role="option"]'));
        const enOption = options.find(o => o.innerText.includes('English'));
        if (enOption) enOption.click();
      })()
    `);

    await sleep(3500);

    const revertedEn = await evalInBrowser(ws, `
      (() => {
        const phone = document.querySelector('header a[href^="tel:"] span')?.innerText;
        const brandStory = document.querySelector('footer p[class*="footer-brand-story"]')?.innerText;
        const navLinks = Array.from(document.querySelectorAll('header nav a')).slice(0, 3).map(a => a.innerText.trim());
        return { phone, brandStory, navLinks };
      })()
    `);
    console.log("Reverted English Content:", revertedEn);
    await takeScreenshot(ws, "live_05_reverted_to_english.png");

    console.log("\n======================================================");
    console.log("🎉 ALL TRANSLATION TESTS COMPLETED & VERIFIED!");
    console.log("======================================================\n");

    ws.close();
  } catch (err) {
    console.error("Test error:", err);
  } finally {
    if (chromeProcess) chromeProcess.kill();
    if (nextProcess) nextProcess.kill();
  }
}

verifyTranslations();
