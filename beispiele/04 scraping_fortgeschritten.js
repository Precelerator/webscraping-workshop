const puppeteer = require("puppeteer");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

async function run() {
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: null,
  });

  const page = await browser.newPage();

  await page.goto("https://precelerator.de/events");

  await page.waitForSelector(".event-page");

  let event_data = await page.$$eval(".card", (events) => {
    events = events.map((e) => {
      return {
        name: e.querySelector(".card-title").innerText,
        datum: e.querySelector(".card .content h6").innerText,
        beschreibung: e.querySelector(".card .card-text").innerText,
        modus: e.querySelector(".card .content .badge.badge-pill").innerText,
        link: e.querySelector(".card .btn-solid-lg").href,
      };
    });
    return events;
  });

  //console.log(event_data);

  const csvWriter = createCsvWriter({
    path: "events.csv",
    header: [
      { id: "name", title: "name" },
      { id: "datum", title: "datum" },
      { id: "beschreibung", title: "beschreibung" },
      { id: "modus", title: "modus" },
      { id: "link", title: "link" },
    ],
  });

  csvWriter.writeRecords(event_data).then(() => {
    console.log("CSV written to file");
  });

  browser.close();
}

run();
