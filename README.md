# Americanas Product Scraper

A very simple console application that scrapes product information from Americanas.

## Installing

To install it, run the following command at the base folder:

```bash
  npm install
```

## Using it

To use it, simply `require` the module and pass it a valid Americanas product URL:

```js
  const getProduct = require('../americanas-product-scraper');

  getProduct('https://www.americanas.com.br/produto/133718358/');
```
