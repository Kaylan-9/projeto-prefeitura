const puppeteer = require('puppeteer');

module.exports = new (class{
  async screenshot(dirImage, link) {
    const browser = await puppeteer.launch({args: ['--start-maximized']});
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
    await page.goto(link, { waitUntil: 'networkidle2' });
    await page.screenshot({path: dirImage});
    browser.close();
  }
})();