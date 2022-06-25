const router = require("express").Router();
const cartRoute = require("./cart");
const { authMiddleware } = require("./middlewares");
const productRoute = require("./product");
const userRouter = require("./user");

router.use("/v1", productRoute);
router.use("/v1", userRouter);
router.use("/v1", authMiddleware, cartRoute);

module.exports = router;
