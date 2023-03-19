const chromium = require ('@sparticuz/chromium');
const puppeteer = require ('puppeteer-core');

module.exports.handle = async (event, context) => {
  try {
    const browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
      ignoreHTTPSErrors: true,
    })
  
    const page = await browser.newPage();
    await page.goto('https://www.amazon.com.br/gp/bestsellers');
  
    const cards = await page.evaluate(() =>
    Array.from(document.querySelectorAll('#anonCarousel1 .a-carousel .p13n-sc-uncoverable-faceout'), (e) => ({
      title: e.querySelector('.a-link-normal span').innerText,
      url: e.querySelector('.a-link-normal').href,
      price: e.querySelector('._cDEzb_p13n-sc-price_3mJ9Z').innerText,
      imageUri: e.querySelector('.a-link-normal img').src,
    })))
    
    await browser.close();
    response = {"statusCode":200, "body": JSON.stringify(cards)};
    return(response);
  } catch (error) {
    return(error);
  }
  
};
