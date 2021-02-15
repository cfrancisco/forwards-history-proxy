const { Logger } = require('@dojot/microservice-sdk');
const createError = require('http-errors');

const logger = new Logger('gui-proxy');

const handle = (r) => {
  const newR = { ...r };
  if (r.attr === undefined) {
    return Promise.reject(createError(400, 'No attribute was passed.', { response: { status: 400, statusText: 'Missing data', data: { error: 'No attribute was passed.' } } }));
  }

  if (r.dateTo === undefined || r.dateTo === null) {
    newR.dateTo = new Date().toISOString();
  }
  if (r.dateFrom === undefined || r.dateFrom === null) {
    newR.dateFrom = '1970-01-01T00:00:00.000Z';
  }
  if (r.limit === undefined || r.limit === null || r.limit === 0) {
    newR.limit = 256; // 2999
  }
  logger.info('Params were sent correctly.');
  return Promise.resolve(newR);
};
module.exports = { handle };
