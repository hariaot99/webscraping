const chromium = require ('@sparticuz/chromium');
const puppeteer = require ('puppeteer-core');

module.exports.hello = async () => {

  console.log("ENTROU NA FUNCAO");
  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath(),
    headless: chromium.headless,
    ignoreHTTPSErrors: true,
  })
  console.log("PASSOU DA CRIACAO DO BROWSER");
  const page = await browser.newPage();
  console.log("Passou na criacao de pagina");
  await page.goto('https://www.amazon.com.br/bestsellers');
  console.log("ENTROU NA PAGINA INDICADA");
  const title = await page.title();
  await browser.close();
  return(title);
};
