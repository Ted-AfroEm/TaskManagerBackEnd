//VALIDATION
const Joi = require("@hapi/joi");

const registerValidation = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().min(4).max(30).required(),
    lastName: Joi.any().optional(),
    email: Joi.string().min(3).required().email(),
    password: Joi.string().min(6).required(),
  });
  //LETS VALIDATE THE DATA BEFORE WE USE
  return schema.validate(data);
};
const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });
  //LETS VALIDATE THE DATA BEFORE WE USE
  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
