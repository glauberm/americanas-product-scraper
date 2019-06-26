'use strict';

const request = require('request');

const timeout = 3000;
const maxAttemps = 5;
let attempt = 0;

/**
 * Tenta realizar a requisição ao servidor e, em caso de sucesso,
 * envia o HTML respondido para a função callback.
 * 
 * @param url
 * @param callback 
 */
function getPageHtml(url, callback) {
  request({
    uri: url,
    gzip: true,
    timeout: timeout,
    time: true
  }, function (error, response, body) {
    if (response) {
      const {timingStart, timings, timingPhases, statusCode, statusMessage} = response;

      console.log(`Requisição iniciada em ${timestampConverter(timingStart)}`);
      console.log(`Requisição finalizada em ${timestampConverter(timingStart + timings.end)}`);
      console.log(`Duração total da requisição: ${(timingPhases.total).toFixed(2)}ms`);
      console.log(`HTTP ${statusCode}: ${statusMessage}`);

      if (statusCode >= 200 && statusCode < 300) {
        callback(body);
      } else {
        console.log('Processo finalizado. A requisição não foi a esperada.')
      }
    }
  })
  .on('error', function(error) {
    handleErrors(error, url, callback);
  })
  .on('request', function() {
    attempt++;
    console.log(`Iniciando requisição ao servidor em ${url} (Tentativa #${attempt})`);
  })
};

/**
 * Lida com possíveis erros da requisição.
 * 
 * @param error 
 * @param url 
 */
function handleErrors(error, url, callback)
{
  switch (error.code) {
    case 'ETIMEDOUT':
      console.error('Tempo máximo permitido para se comunicar com o servidor atingido.');

      if (attempt < maxAttemps) {
        console.log('Tentando de novo...');
        getPageHtml(url, callback);
      }
      break;
    case 'ESOCKETTIMEDOUT':
      console.error('Tempo máximo permitido para receber resposta do socket atingido.');

      if (attempt < maxAttemps) {
        console.log('Tentando de novo...');
        getPageHtml(url, callback);
      }
      break;
    case 'ENOTFOUND':
      console.error('Servidor não encontrado. Verifique se a URL está correta.');
      break;
    default:
      console.error(error);
      break;
  }

  if (error.connect === true) {
    console.error('Erro ao realizar conexão com o servidor.');
  }
}

/**
 * Converte timestamp para hora.
 * 
 * @param timestamp 
 */
function timestampConverter(timestamp)
{
  const date = new Date(timestamp);
  const hour = ('0' + date.getHours()).slice(-2);
  const minutes = ('0' + date.getMinutes()).slice(-2);
  const seconds = ('0' + date.getSeconds()).slice(-2);
  const milliseconds = date.getMilliseconds();
  const time = `${hour}:${minutes}:${seconds}:${milliseconds}`;

  return time;
}

module.exports = getPageHtml;
