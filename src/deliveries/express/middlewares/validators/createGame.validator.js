import Joi from 'joi';

const newGameSchema = Joi.object().keys({
  name: Joi.string().min(3).max(60).required()
})

export default newGameSchema;