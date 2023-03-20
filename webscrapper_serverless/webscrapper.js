const chromium = require("@sparticuz/chromium");
const puppeteer = require("puppeteer-core");
const uuid = require("uuid");
const AWS = require("aws-sdk");

AWS.config.setPromisesDependency(require("bluebird"));

const db = new AWS.DynamoDB.DocumentClient();

module.exports.handle = async (event, context) => {
  try {
    const browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
      ignoreHTTPSErrors: true,
    });

    const page = await browser.newPage();
    await page.goto("https://www.amazon.com.br/gp/bestsellers");

    const cards = await page.evaluate(() =>
      Array.from(
        document.querySelectorAll(
          "#anonCarousel1 .a-carousel .p13n-sc-uncoverable-faceout"
        ),
        (e) => ({
          title: e.querySelector(".a-link-normal span").innerText,
          url: e.querySelector(".a-link-normal").href,
          price: e.querySelector("._cDEzb_p13n-sc-price_3mJ9Z").innerText,
          imageUri: e.querySelector(".a-link-normal img").src,
        })
      )
    );

    await browser.close();
    response = { statusCode: 200, body: JSON.stringify(cards)};

    // inserção dos produtos no banco de dados
    for (let index = 0; index < cards.length; index++) {
      const element = cards[index];
      submitProduct(productInfo(element.title, element.url, element.price, element.imageUri))
        .then((res) => {
          callback(null, {
            statusCode: 200,
            body: JSON.stringify({
              message: `Sucessfully submitted product`,
              productId: res.id,
            }),
          });
        })
        .catch((error) => {
          console.log(error)
          callback(null, {
            statusCode: 500,
            body: JSON.stringify({
              message: 'Error during product submit'
            })
          })
        });
    }
    return (response);
  } catch (error) {
    return (error);
  }
};

const submitProduct = (product) => {
  return db.put({
    TableName: "ProductsTable",
    Item: product
  }).promise().then(res => product)
  
};

const productInfo = (title, url, price, imageUri) => {
  const timestamp = new Date().getTime();
  return {
    id: uuid.v1(),
    title: title,
    url: url,
    price: price,
    imageUri: imageUri,
    submittedAt: timestamp,
    updatedAt: timestamp,
  };
};
