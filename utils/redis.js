const redis = require('redis');
const config = require('../config');

const client = redis.createClient(config.REDIS_PORT);

console.log(config.REDIS_PORT);

client.on('error', (err) => {
  throw new Error(err.message);
});

// cache middleware for redis

function getRedisData(key) {
  client.get(key, (err, data) => {
    if (err) {
      throw new Error('Error getting data from redis');
    }
    if (data) {
      return data;
    }
  });
}

const setRedisData = (key, value) => {
  client.setex(key, 600, JSON.stringify(value));
};

module.exports = {
  getRedisData,
  setRedisData,
};
