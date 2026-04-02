import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  
  const url = 'http://localhost:5173/';
  await page.goto(url);
  
  // Wait for 3D Scene
  await new Promise(r => setTimeout(r, 5000));
  
  // Capture Hero
  await page.screenshot({ path: 'docs/quality/screenshots/hero.png' });
  
  // Scroll to Experience (Z ~ 150 approx)
  await page.evaluate(() => window.scrollTo(0, 3000));
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: 'docs/quality/screenshots/experience.png' });
  
  // Scroll to Projects (Z ~ 450 approx)
  await page.evaluate(() => window.scrollTo(0, 10000));
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: 'docs/quality/screenshots/projects.png' });

  await browser.close();
})();
