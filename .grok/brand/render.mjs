import { chromium } from "playwright";
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";

const shots = [
  { file: "og.html", out: "og-raw.png", w: 1200, h: 630 },
  { file: "banner.html", out: "banner-raw.png", w: 1200, h: 264 },
];

const dir = resolve("/workspace/.grok/brand");
const browser = await chromium.launch({ args: ["--disable-web-security"] });

for (const shot of shots) {
  const page = await browser.newPage({
    viewport: { width: shot.w, height: shot.h },
    deviceScaleFactor: 2,
  });
  const url = pathToFileURL(resolve(dir, shot.file)).href;
  await page.goto(url, { waitUntil: "networkidle" });
  await page.evaluate(async () => {
    await Promise.all([...document.images].map((img) => (img.complete ? null : new Promise((r) => { img.onload = r; img.onerror = r; }))));
    await document.fonts.ready;
  });
  await page.waitForTimeout(200);
  await page.screenshot({
    path: resolve(dir, shot.out),
    type: "png",
    clip: { x: 0, y: 0, width: shot.w, height: shot.h },
  });
  await page.close();
  console.log("wrote", shot.out);
}

await browser.close();
