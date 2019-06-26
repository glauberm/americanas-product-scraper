'use strict';

const request = require('request');

const url = 'https://www.americanas.com.br/produto/133718358/';

request(url, function (error, response, body) {
  console.log(body)
})
.on('error', function(error) {
  console.error(error);
})
.on('request', function() {
  console.log('Iniciando requisição...');
})