import Joi from 'joi';

export const calculateRecommendedReferencesRequestSchema = Joi.object({
  email: Joi.string().email().required(),
  companyName: Joi.string().required(),
  fullName: Joi.string().required(),
  industry: Joi.string(),
  jobTitle: Joi.string(),
  companySize: Joi.string(),
  linkedInProfile: Joi.string(),
});
