import Joi from 'joi';

const registerSchema = Joi.object().keys({
  email: Joi.string().email().max(50).required(),
  username: Joi.string().alphanum().min(3).max(50).required(),
  password: Joi.string().min(6).max(32).required(),
});

export default registerSchema;