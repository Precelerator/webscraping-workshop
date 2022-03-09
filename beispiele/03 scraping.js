const puppeteer = require("puppeteer");

async function run() {
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: null,
  });

  const page = await browser.newPage();

  await page.goto("https://precelerator.de/events");

  // warten, bis die Seite auch wirklich da ist
  // der Selektor verweist auf einen zentralen Bereich der Seite (ein Element mit Klasse event-page)
  // -> ist der nicht da ist die Seite noch nicht geladen
  await page.waitForSelector(".event-page");

  //   let events = await page.evaluate(() => {
  //     return document.querySelectorAll(".card-title").innerText;
  //   });
  let events = await page.$$eval(".card-title", (events) => {
    return events.map((e) => e.innerText);
  });

  console.log(events);

  browser.close();
}

run();
