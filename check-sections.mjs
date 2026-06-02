import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1.5 });
await page.goto('http://localhost:3000', { waitUntil: 'networkidle0', timeout: 30000 });
await page.evaluate(() => { document.getElementById('page-loader').style.display='none'; });

await page.evaluate(() => document.getElementById('why-us').scrollIntoView());
await new Promise(r => setTimeout(r, 400));
const compareEl = await page.$('#why-us');
await compareEl.screenshot({ path: 'temporary screenshots/check-compare.png' });

await page.evaluate(() => document.getElementById('contact').scrollIntoView());
await new Promise(r => setTimeout(r, 400));
const contactEl = await page.$('#contact');
await contactEl.screenshot({ path: 'temporary screenshots/check-contact.png' });

await page.evaluate(() => document.getElementById('location').scrollIntoView());
await new Promise(r => setTimeout(r, 800));
const locEl = await page.$('#location');
await locEl.screenshot({ path: 'temporary screenshots/check-map.png' });

await browser.close();
console.log('done');
