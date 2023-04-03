import Joi from 'joi';

const modValidatorSchema = Joi.object().keys({
  name: Joi.string().min(5).max(60).required(),
  description: Joi.string().max(10000).required(),
  additionalInfo: Joi.string().max(3000).optional(),
  ownerId: Joi.string().required(),
  gameId: Joi.string().required()
})

export default modValidatorSchema