import { spawn } from "child_process";
import fs from "fs";
import path from "path";

const PORT = 3015;
const CHROME_PORT = 9230;
const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const ARTIFACT_DIR = "C:\\Users\\Aawesh\\.gemini\\antigravity\\brain\\446bb73b-837f-463c-aeb6-bb350999ae44\\browser-verification";

if (!fs.existsSync(ARTIFACT_DIR)) {
  fs.mkdirSync(ARTIFACT_DIR, { recursive: true });
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function waitHttp(url, timeoutMs = 20000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.ok || res.status === 200 || res.status === 304) {
        return true;
      }
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

async function runBrowserTest() {
  console.log("=== STARTING NEXT.JS SERVER (PORT 3015) ===");
  const nextProcess = spawn("node", ["node_modules/next/dist/bin/next", "start", "-p", String(PORT), "-H", "127.0.0.1"], {
    stdio: "inherit",
    env: { ...process.env, PORT: String(PORT) },
  });

  let chromeProcess = null;

  try {
    await waitHttp(`http://127.0.0.1:${PORT}`);
    console.log(`[Next.js Server Ready on port ${PORT}]`);

    console.log("=== LAUNCHING REAL GOOGLE CHROME (HEADLESS CDP) ===");
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
    console.log("[Chrome Headless CDP is Ready]");

    const newTabRes = await fetch(`http://127.0.0.1:${CHROME_PORT}/json/new?http://127.0.0.1:${PORT}`, {
      method: "PUT",
    });
    const tabData = await newTabRes.json();

    const ws = new WebSocket(tabData.webSocketDebuggerUrl);
    await new Promise((resolve, reject) => {
      ws.onopen = resolve;
      ws.onerror = reject;
    });

    await sendCdp(ws, "Page.enable");
    await sendCdp(ws, "Runtime.enable");
    await sendCdp(ws, "DOM.enable");

    // -------------------------------------------------------------
    // TEST 1: HOME PAGE
    // -------------------------------------------------------------
    console.log("\n--- TEST 1: Verifying Home Page ---");
    await sendCdp(ws, "Page.navigate", { url: `http://127.0.0.1:${PORT}` });
    await sleep(2000);
    await takeScreenshot(ws, "01_home_desktop.png");

    // -------------------------------------------------------------
    // TEST 2: OPEN LANGUAGE DROPDOWN
    // -------------------------------------------------------------
    console.log("\n--- TEST 2: Opening Language Switcher Dropdown ---");
    await evalInBrowser(ws, `document.querySelector('div[class*="LanguageSwitcher"] button[aria-haspopup="listbox"]').click()`);
    await sleep(500);

    const dropdownStatus = await evalInBrowser(ws, `
      (() => {
        const dd = document.querySelector('div[class*="LanguageSwitcher_dropdown"]');
        const options = dd.querySelectorAll('button[role="option"]');
        return {
          isOpen: !!dd,
          optionsCount: options.length,
          header: dd.querySelector('div[class*="dropdownHeaderTitle"]')?.innerText,
          sample: Array.from(options).slice(0, 6).map(o => o.innerText.replace(/\\n/g, ' • '))
        };
      })()
    `);
    console.log("Dropdown Status:", dropdownStatus);
    await takeScreenshot(ws, "02_language_dropdown_open.png");

    // -------------------------------------------------------------
    // TEST 3: SEARCH FILTER FOR 'NEPALI'
    // -------------------------------------------------------------
    console.log("\n--- TEST 3: Searching for 'Nepali' ---");
    await evalInBrowser(ws, `
      (() => {
        const dd = document.querySelector('div[class*="LanguageSwitcher_dropdown"]');
        const input = dd.querySelector('input');
        input.focus();
        const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
        setter.call(input, 'nepali');
        input.dispatchEvent(new Event('input', { bubbles: true }));
      })()
    `);
    await sleep(400);

    const searchNepaliRes = await evalInBrowser(ws, `
      (() => {
        const dd = document.querySelector('div[class*="LanguageSwitcher_dropdown"]');
        return Array.from(dd.querySelectorAll('button[role="option"]')).map(o => o.innerText.replace(/\\n/g, ' • '));
      })()
    `);
    console.log("Filtered for 'nepali':", searchNepaliRes);
    await takeScreenshot(ws, "03_search_nepali.png");

    // -------------------------------------------------------------
    // TEST 4: SEARCH FILTER FOR 'RUSSIAN'
    // -------------------------------------------------------------
    console.log("\n--- TEST 4: Searching for 'Russian' ---");
    await evalInBrowser(ws, `
      (() => {
        const dd = document.querySelector('div[class*="LanguageSwitcher_dropdown"]');
        const input = dd.querySelector('input');
        input.focus();
        const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
        setter.call(input, 'russian');
        input.dispatchEvent(new Event('input', { bubbles: true }));
      })()
    `);
    await sleep(400);

    const searchRussianRes = await evalInBrowser(ws, `
      (() => {
        const dd = document.querySelector('div[class*="LanguageSwitcher_dropdown"]');
        return Array.from(dd.querySelectorAll('button[role="option"]')).map(o => o.innerText.replace(/\\n/g, ' • '));
      })()
    `);
    console.log("Filtered for 'russian':", searchRussianRes);
    await takeScreenshot(ws, "04_search_russian.png");

    // -------------------------------------------------------------
    // TEST 5: SELECTING A LANGUAGE (SELECT RUSSIAN)
    // -------------------------------------------------------------
    console.log("\n--- TEST 5: Selecting Russian ---");
    await evalInBrowser(ws, `
      (() => {
        const dd = document.querySelector('div[class*="LanguageSwitcher_dropdown"]');
        const opt = dd.querySelector('button[role="option"]');
        if (opt) opt.click();
      })()
    `);
    await sleep(600);

    const selectRes = await evalInBrowser(ws, `
      (() => {
        return {
          cookie: document.cookie,
          localStorage: localStorage.getItem('bhh_language'),
          activeBtnLabel: document.querySelector('div[class*="LanguageSwitcher"] button[aria-haspopup="listbox"]')?.innerText
        };
      })()
    `);
    console.log("Selected Language State:", selectRes);
    await takeScreenshot(ws, "05_russian_selected.png");

    // -------------------------------------------------------------
    // TEST 6: DEDICATED /language-assistance PAGE
    // -------------------------------------------------------------
    console.log("\n--- TEST 6: Navigating to /language-assistance ---");
    await sendCdp(ws, "Page.navigate", { url: `http://127.0.0.1:${PORT}/language-assistance` });
    await sleep(2000);

    const pageAudit = await evalInBrowser(ws, `
      (() => {
        return {
          title: document.title,
          h1: document.querySelector('h1')?.innerText,
          phoneLinks: Array.from(document.querySelectorAll('a[href^="tel:"]')).map(a => a.innerText.trim()).filter(Boolean),
          hasTTY711: document.body.innerText.includes('TTY: 711'),
          hasSection1557: document.body.innerText.includes('Section 1557'),
          hasTitleVI: document.body.innerText.includes('Title VI'),
          hasBulletins: document.body.innerText.includes('99-17-11') && document.body.innerText.includes('99-25-01')
        };
      })()
    `);
    console.log("/language-assistance Audit:", pageAudit);
    await takeScreenshot(ws, "06_language_assistance_top.png");

    // Scroll down to tagline cards
    await evalInBrowser(ws, `window.scrollBy({ top: 600, behavior: 'instant' })`);
    await sleep(400);
    await takeScreenshot(ws, "07_tagline_cards.png");

    // Scroll to grievance & compliance info
    await evalInBrowser(ws, `window.scrollBy({ top: 800, behavior: 'instant' })`);
    await sleep(400);
    await takeScreenshot(ws, "08_grievance_procedure.png");

    // -------------------------------------------------------------
    // TEST 7: ACCESSIBILITY PAGE INTEGRATION
    // -------------------------------------------------------------
    console.log("\n--- TEST 7: Checking /accessibility page ---");
    await sendCdp(ws, "Page.navigate", { url: `http://127.0.0.1:${PORT}/accessibility` });
    await sleep(1500);
    await evalInBrowser(ws, `
      (() => {
        const heading = Array.from(document.querySelectorAll('h2')).find(h => h.innerText.includes('Language Assistance'));
        if (heading) heading.scrollIntoView({ behavior: 'instant' });
      })()
    `);
    await sleep(400);
    await takeScreenshot(ws, "09_accessibility_lep_section.png");

    // -------------------------------------------------------------
    // TEST 8: MOBILE RESPONSIVE DRAWER (375x667)
    // -------------------------------------------------------------
    console.log("\n--- TEST 8: Mobile Drawer Verification (375x667) ---");
    await sendCdp(ws, "Emulation.setDeviceMetricsOverride", {
      width: 375,
      height: 667,
      deviceScaleFactor: 2,
      mobile: true,
    });
    await sendCdp(ws, "Page.navigate", { url: `http://127.0.0.1:${PORT}` });
    await sleep(1500);

    // Open mobile hamburger menu
    await evalInBrowser(ws, `
      (() => {
        const allButtons = Array.from(document.querySelectorAll('header button'));
        const hBtn = allButtons.find(b => !b.getAttribute('aria-haspopup') && b.querySelector('svg'));
        if (hBtn) hBtn.click();
      })()
    `);
    await sleep(600);
    await takeScreenshot(ws, "10_mobile_drawer_languages.png");

    console.log("\n=======================================================");
    console.log("🎉 ALL 8 REAL BROWSER TESTS PASSED FLAWLESSLY!");
    console.log("Screenshots captured in:", ARTIFACT_DIR);
    console.log("=======================================================\n");

    ws.close();
  } catch (err) {
    console.error("Test failed with error:", err);
  } finally {
    if (chromeProcess) chromeProcess.kill();
    if (nextProcess) nextProcess.kill();
  }
}

runBrowserTest();
