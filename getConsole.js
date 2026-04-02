import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  page.on('console', msg => {
    if (msg.type() === 'error' || msg.type() === 'warning') {
      console.log(`[${msg.type()}] ${msg.text()}`);
    }
  });

  page.on('pageerror', error => {
    console.log(`[pageerror] ${error.message}`);
  });

  try {
    await page.goto('http://localhost:5174', { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 2000));
  } catch (e) {
    console.error(e);
  } finally {
    await browser.close();
  }
})();
