const router = require("express").Router();
const productRoute = require("./product");

router.use("/v1", productRoute);

module.exports = router;
