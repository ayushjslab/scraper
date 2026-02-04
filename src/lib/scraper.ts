import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";

export async function scrapeWebsite(url: string) {
  const browser = await puppeteer.launch({
    args: chromium.args,
    executablePath: await chromium.executablePath(),
    headless: true,
    defaultViewport: {
      width: 1280,
      height: 800,
    },
  });

  try {
    const page = await browser.newPage();
    await page.goto(url, {
      waitUntil: "networkidle2",
      timeout: 60_000,
    });

    const data = await page.evaluate(() => ({
      title: document.title,
      h1: Array.from(document.querySelectorAll("h1")).map(
        (el) => el.textContent
      ),
    }));

    return data;
  } finally {
    await browser.close();
  }
}
