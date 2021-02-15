const { logger } = require('@dojot/dojot-module-logger');

const handle = (r) => {
  const newR = { ...r };
  if (r.attr === undefined) {
    throw new Error('No attribute was passed.');
  }

  if (r.dateTo === undefined || r.dateTo === null) {
    newR.dateTo = new Date().toISOString();
  }
  if (r.dateFrom === undefined || r.dateFrom === null) {
    newR.dateFrom = '1970-01-01T00:00:00.000Z';
  }
  if (r.limit === undefined || r.limit === null || r.limit === 0) {
    newR.limit = 999;
  }
  logger.info('Params were sent correctly.');
  return Promise.resolve(newR);
};
module.exports = { handle };
