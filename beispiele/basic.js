// Wir nutzen puppeteer zur Steuerung des Browsers - muss immer importiert werden
// Du hast noch kein puppeteer installiert? Dann folge den Anweisungen in der README.md
const puppeteer = require("puppeteer");

// Unsere main function, hier findet alles statt was wir mit puppeteer tun wollen
async function run() {
  // Browserinstanz starten
  // headless: false heißt du kannst zuschauen, was passiert, bei true läuft er im Hintergrund
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });

  // Seite öffnen
  const page = await browser.newPage();

  // Zu URL navigieren
  await page.goto("https://github.com");

  // Browser schließen
  //browser.close();
}

// Schritte zum Ausführen der Datei:
// 1) öffne ein Terminal/ die Konsole,
// 2) navigiere in den Ordner, in dem basic.js liegt (hier: beispiele/basic.js)
// führe die Datei mit Node.js aus, indem du "node basic.js" ins Terminal eingibst und Enter drückst
run();
