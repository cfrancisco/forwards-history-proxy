const config = {
  port: process.env.PORT || 3000,
  deviceManagerUrl:
    process.env.DEVICE_MANAGER_URL || 'http://device-manager:5000',
  historyUrl: process.env.HISTORY_URL || 'http://history:8000',
  retrieverUrl: process.env.RETRIEVER_URL || 'http://influx:8000',
};

module.exports = config;
