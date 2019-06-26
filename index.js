'use strict';

const getPageHtml = require('./getPageHtml');
const scrapeHtml = require('./scrapeHtml');

getPageHtml(url, function(html) {
  const product = scrapeHtml(html);

  console.log(product);
});