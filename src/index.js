const { Logger } = require('@dojot/microservice-sdk');
const express = require('express');
const proxyMiddleware = require('./proxy');
const config = require('./config');

Logger.setTransport('console', {
  level: 'debug',
});
Logger.setVerbose(true);
const logger = new Logger('gui-proxy');

const { port } = config;

const app = express();

app.get('/history/device/:deviceId/history', async (req, res) => {
  logger.info('Endpoint called!');
  return proxyMiddleware.handleHistoryRequest(req)
    .then((r) => {
      logger.debug(`Sending response: ${JSON.stringify(r.respData)}`);
      res.status(200).send(r.respData);
    }).catch((error) => {
      //      logger.debug(error);
      const code = error.response.status;
      const title = error.response.statusText;
      const description = error.response.data.error;

      return res.status(code).send({
        title,
        description,
      });
    });
});

app.listen(port, () => {
  logger.info(`init: service listening at ${port}`);
});

module.exports = app;
