const { config } = require('dotenv');

config();

module.exports = {
  PORT: process.env.PORT,
  HOST: process.env.HOST,
};
