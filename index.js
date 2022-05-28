const express = require("express");
const connectDatabase = require("./engines/database");
const apiV1 = require("./route/");

const app = express();

app.use(express.json());

app.use("/api", apiV1);

app.use((req, res, next) => {
  const error = new Error();
  error.name = "Not Found";
  error.status = 400;
  error.message = "Route not found, please try a valid endpoint";
  next(err);
});

app.use((err, req, res, next) => {
  res.json({
    status: err.status || 500,
    message: err.message,
  });
});

connectDatabase(() => {
  app.listen(5000, () => {
    console.log("app started");
  });
});
