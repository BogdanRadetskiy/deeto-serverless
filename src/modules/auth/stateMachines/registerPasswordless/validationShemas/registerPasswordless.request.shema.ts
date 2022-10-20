import Joi from 'joi';

export const registerPasswordlessRequestSchema = Joi.object({
  email: Joi.string().email().required(),

  firstName: Joi.string().min(1).max(25).required(),

  lastName: Joi.string().min(1).max(25).required(),
});
