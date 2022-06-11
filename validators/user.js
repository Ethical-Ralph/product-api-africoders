const Joi = require("joi");

const createUserSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().required(),
  repeat_password: Joi.ref("password"),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
});

const loginUserSchema = Joi.object({
  userIdentifier: Joi.string().required(),
  password: Joi.string().required(),
});

const validateLogin = async (user) => {
  try {
    const value = await loginUserSchema.validateAsync(user);
    return value;
  } catch (error) {
    throw new Error(error.message || "Validation error");
  }
};

const validateCreate = async (user) => {
  try {
    const value = await createUserSchema.validateAsync(user);
    return value;
  } catch (error) {
    throw new Error(error.message || "Validation error");
  }
};

const userValidator = {
  validateCreate,
  validateLogin,
};

module.exports = userValidator;
