'use strict';

const getPageHtml = require('./get-page-html');
const scrapeHtml = require('./scrape-html');

function getProduct(url) {
  getPageHtml(url, function(html) {
    const product = scrapeHtml(html);
  
    console.log(product);
  });
}

module.exports = getProduct;