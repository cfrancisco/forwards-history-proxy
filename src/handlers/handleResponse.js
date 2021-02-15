// const config = require('/../config');
const { logger } = require('@dojot/dojot-module-logger');

const handle = (r) => {
  logger.debug('Received data: ', JSON.stringify(r.rawResponse));
  const respData = {};
  respData[r.attr] = r.rawResponse.map(element => {
    const newEl = { device_id: r.deviceId };
    newEl.ts = element.ts;
    newEl.value = element.attrs[0].value;
    newEl.attr = element.attrs[0].label;
    return newEl;
  });
  // console.log('New data: ', JSON.stringify(respData));

  const newr = { ...r, respData };
  return newr;
};

module.exports = { handle };
