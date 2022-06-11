const userRouter = require("express").Router();
const userService = require("../service/user");
const userValidator = require("../validators/user");
const { authMiddleware } = require("./middlewares");

userRouter.get("/user", authMiddleware, async (req, res, next) => {
  try {
    const { user } = req;

    res.json({
      status: 200,
      data: { ...user.toJSON() },
      message: "User details fetched successfully",
    });
  } catch (error) {
    next(error);
  }
});

userRouter.post("/signup", async (req, res, next) => {
  try {
    const payload = req.body;
    const data = await userValidator.validateCreate(payload);

    const user = await userService.create(data);

    res.json({
      status: 201,
      data: user,
      message: "User fetched successfully",
    });
  } catch (error) {
    next(error);
  }
});

userRouter.post("/login", async (req, res, next) => {
  try {
    const payload = req.body;
    const data = await userValidator.validateLogin(payload);

    const user = await userService.login(data);

    res.json({
      status: 200,
      data: user,
      message: "User logged in successfully",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = userRouter;
