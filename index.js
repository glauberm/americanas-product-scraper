'use strict';

const getPageHtml = require('./getPageHtml');

getPageHtml(url, function(html) {
  console.log(html);
});