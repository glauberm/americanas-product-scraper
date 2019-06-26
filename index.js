'use strict';

const getPageHtml = require('./getPageHtml');
const scrapeHtml = require('./scrapeHtml');

function getProduct(url) {
  getPageHtml(url, function(html) {
    const product = scrapeHtml(html);
  
    console.log(product);
  });
}

module.exports = getProduct;