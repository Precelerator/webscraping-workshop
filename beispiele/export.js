const puppeteer = require("puppeteer");

async function run() {
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: null,
  });

  const page = await browser.newPage();

  await page.goto("https://github.com");

  // Screenshot der Seite machen und speichern
  await page.screenshot({ path: "github.png" });

  // Seite als PDF speichern - funktioniert nur wenn headless in Z. 5 auf true ist!
  await page.pdf({ path: "github.pdf", format: "a4" });

  browser.close();
}

run();
