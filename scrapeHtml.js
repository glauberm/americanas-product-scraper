'use strict';

const cheerio = require('cheerio');

/**
 * Itera pelo HTML, constrói objeto com informações escolhidas e o retorna.
 * 
 * @param $ 
 * @param obj 
 */
function scrapeHtml(html, callback) {
  const $ = cheerio.load(html);
  let obj = {};

  obj = getId($, obj);
  obj = getBreadcrumb($, obj);
  obj = getName($, obj);
  obj = getImg($, obj);
  obj = getSeller($, obj);
  obj = getPrice($, obj);

  return obj;
}

/**
 * Coleta a informação de id.
 * 
 * @param $ 
 * @param obj 
 */
function getId($, obj) {
  if ( $('a[href="#reviews"]').length ) {
    let id = $('a[href="#reviews"]').parent().children('span').text();
    id = id.replace('(Cód.', '').replace(')', '');

    obj.id = parseInt(id);

  } else {
    console.error('Falha ao obter `id`.');
  }

  return obj;
}

/**
 * Coleta a informação de breacrumb.
 * 
 * @param $ 
 * @param obj 
 */
function getBreadcrumb($, obj) {
  if ( $('.product-breadcrumb a > div > span').length ) {
    obj.breadcrumb = [];

    $('.product-breadcrumb a > div > span').each(function(index, value) {
      obj.breadcrumb[index] = $(value).text();
    });

  } else {
    console.error('Falha ao obter `breadcrumb`.');
  }

  return obj;
}

/**
 * Coleta a informação de imagem.
 * 
 * @param $ 
 * @param obj 
 */
function getName($, obj) {
  if ( $('#product-name-default').length ) {
    obj.name = $('#product-name-default').text();

  } else {
    console.error('Falha ao obter `name`.');
  }

  return obj;
}

/**
 * Coleta a informação de imagem.
 * 
 * @param $ 
 * @param obj 
 */
function getImg($, obj) {
  if ( $('.image-gallery-slides img:first-of-type').length ) {
    obj.img = $('.image-gallery-slides img:first-of-type').attr('src');

  } else {
    console.error('Falha ao obter `img`.');
  }

  return obj;
}

/**
 * Coleta a informação de vendedor.
 * 
 * @param $ 
 * @param obj 
 */
function getSeller($, obj) {
  if ( $('.seller-name-container span:not(:has(> *))').length ) {
    obj.seller = $('.seller-name-container span:not(:has(> *))').text();

  } else {
    console.error('Falha ao obter `seller`.');
  }

  return obj;
}

/**
 * Coleta a informação de preço.
 * 
 * @param $ 
 * @param obj 
 */
function getPrice($, obj) {
  if ( $('.main-price .sales-price:first-of-type').length ) {
    let price = $('.main-price .sales-price:first-of-type').text();
    price = price.replace('R$ ', '').replace('.', '').replace(',', '.');

    obj.price = parseFloat(price);

  } else {
    console.error('Falha ao obter `price`.');
  }

  return obj;
}

module.exports = scrapeHtml;
