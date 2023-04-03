import Joi from 'joi';

const signInSchema = Joi.object().keys({
  email: Joi.string().email().max(50).required(),
  password: Joi.string().max(32).required(),
});

export default signInSchema;