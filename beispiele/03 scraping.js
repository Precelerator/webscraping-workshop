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

  // Mit $$eval können wir per Selektor auf ein Element zugreifen
  let events = await page.$$eval(".card-title", (events) => {
    // mit .innerText greifen wir auf den Text innerhalb des Elements zu
    return events.map((e) => e.innerText);
  });

  // das Ergebnis landet in der Konsole/ im Terminal, in dem du das Skript ausführst
  console.log(events);

  browser.close();
}

run();
