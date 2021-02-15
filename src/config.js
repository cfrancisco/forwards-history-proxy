const config = {
  port: process.env.PORT || 3000,
  retrieverUrl: process.env.RETRIEVER_URL || 'http://localhost:8000',
};

module.exports = config;
