const { logger } = require('@dojot/dojot-module-logger');
const express = require('express');
const proxyMiddleware = require('./proxy');
const config = require('./config');

const { port } = config;

const app = express();

app.get('/history/device/:deviceId/history', async (req, res) => {
  try {
    logger.info('Endpoint called!');
    return proxyMiddleware.handleHistoryRequest(req)
      .then((r) => {
        logger.debug('Sending response. ');
        res.status(200).send({
          data: r.respData,
        });
      });
  } catch (error) {
    logger.error(error.message);
    return res.status(400).send({
      message: error.message,
    });
  }
});

app.listen(port, () => {
  logger.info(`Service listening at http://gui-proxy:${port}`);
});

module.exports = app;
