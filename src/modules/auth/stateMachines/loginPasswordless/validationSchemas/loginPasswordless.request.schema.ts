import Joi from 'joi';

export const loginPasswordlessRequestSchema = Joi.object({
  email: Joi.string().email().required(),
});
