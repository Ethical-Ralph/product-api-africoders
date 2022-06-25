const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  REDIS_PORT: process.env.REDIS_PORT,
};
