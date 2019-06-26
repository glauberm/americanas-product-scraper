# Americanas Product Scraper

A very simple console application that scrapes product information from Americanas.

## Installing the dependencies

First, install the dependencies by running the following command at the base folder:

```bash
  npm install
```

Then, simply `require` the module and pass it a valid Americanas product URL:

```js
  const getProduct = require('../americanas-product-scraper');

  getProduct('https://www.americanas.com.br/produto/133718358/');
```
