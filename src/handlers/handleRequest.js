const { Logger } = require('@dojot/microservice-sdk');
const axios = require('axios');
const configBase = require('../config');
// const influxH
// const instance = axios.create({ baseURL: configBase.retrieverUrl });
/*
instance.interceptors.request.use(async config => {
  const token = getToken();
  if (token) {
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
*/
const logger = new Logger('gui-proxy');

const handle = async (r) => {
  const url = `${configBase.retrieverUrl}/tss/v1/devices/${r.deviceId}/attrs/${r.attr}/data`;
  logger.debug(`Requesting data to Influx at: ${url}`);
  const paramList = {
    dateTo: r.dateTo, dateFrom: r.dateFrom, limit: r.limit,
  };
  const pms = new URLSearchParams(paramList);
  const res = await axios.get(
    `${url}?${pms.toString()}`,
    { headers: { authorization: r.headers } },
  );
  return { ...r, rawResponse: res.data };
};

module.exports = { handle };
