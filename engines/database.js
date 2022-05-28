const mongoose = require("mongoose");
const config = require("../config");

const connectDatabase = (cb) => {
  mongoose.connect(config.MONGO_URI, {}, () => {
    console.log("Mongodb connected");
    cb();
  });
};

module.exports = connectDatabase;
