const router = require("express").Router();
const productRoute = require("./product");
const userRouter = require("./user");

router.use("/v1", productRoute);
router.use("/v1", userRouter);

module.exports = router;
