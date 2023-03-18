'use strict';
const { getChrome } = require('./chrome-script');
const puppeteer = require('puppeteer');

 
module.exports.hello = async (event) => {
  const { url } = event.queryStringParameters;
  const chrome = await getChrome();
  const browser = await puppeteer.connect({
    browserWSEndpoint: chrome.endpoint,
  });
  const page = await browser.newPage();
  await page.goto(url, {waitUntil: 'networkidle0'});
  const content = await page.evaluate(() => document.body.innerHTML);
  return{
    statusCode: 200,
    body: JSON.stringify({
      content,
    }),
  };
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
