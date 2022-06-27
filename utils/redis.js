const { json } = require('express');
const redis = require('redis');
const config = require('../config');

// const client = redis.createClient();

const client = redis.createClient({
  host: config.REDIS_URL,
  port: config.REDIS_PORT,
  // username: '',
  // password: config.REDIS_PASSWORD,
});

client.connect();

client.on('connect', function () {
  console.log('Connected!');
});

client.on('error', (err) => {
  throw new Error(err.message);
});

async function getRedisData(key) {
  const data = await client.get(key);
  return data ? JSON.parse(data) : null;
}

const setRedisData = (key, value) => {
  client.setEx(key, 600, JSON.stringify(value));
};

module.exports = {
  getRedisData,
  setRedisData,
};
