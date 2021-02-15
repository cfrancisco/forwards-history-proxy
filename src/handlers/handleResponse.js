const { Logger } = require('@dojot/microservice-sdk');
const createError = require('http-errors');

const logger = new Logger('gui-proxy');

const handle = (r) => {
  logger.debug(`Received data: ${JSON.stringify(r.rawResponse.data)}`);

  // For the implementation to be in compliance, the message below
  // should be sent whenever the data is empty, even if the
  // attribute exists.

  if (r.rawResponse.data.length === 0) {
    return Promise.reject(createError(404, 'Attr not found', { response: { status: 404, statusText: 'Attr not found', data: { error: 'No data for the given attribute could be found' } } }));
  }

  const respData = r.rawResponse.data.map(element => {
    const newEl = { device_id: r.deviceId };
    newEl.ts = element.ts;
    newEl.value = element.value;
    newEl.attr = r.attr;
    newEl.metadata = {};
    return newEl;
  });
  const newr = { ...r, respData };
  return newr;
};

module.exports = { handle };
