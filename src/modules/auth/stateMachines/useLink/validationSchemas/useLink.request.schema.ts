import Joi from 'joi';

export const useLinkRequestSchema = Joi.object({
  linkId: Joi.string().uuid({ version: 'uuidv4' }).required(),
});
