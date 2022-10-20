import Joi from 'joi';

export const inviteReferenceRequestSchema = Joi.object({
  authenticatedUser: Joi.object({
    email: Joi.string().email().required(),
    firstName: Joi.string().min(1).max(25).required(),
    lastName: Joi.string().min(1).max(25).required(),
  }).required(),

  accountWithContact: Joi.object({
    avatarURL: Joi.string().min(1).max(255),
    title: Joi.string().min(1).max(25),
    companyName: Joi.string().min(1).max(25).required(),
    companySize: Joi.string().min(1).max(25),
    linkedInProfile: Joi.string(),
    industry: Joi.string(),
  }).required(),

  emailBody: Joi.string().min(1).max(1024),
});
