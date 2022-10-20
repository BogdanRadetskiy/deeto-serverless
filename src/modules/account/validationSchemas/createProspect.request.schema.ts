import Joi from 'joi';

export const createProspectRequestSchema = Joi.object({
  authenticatedUser: Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
  }).required(),

  accountWithContact: Joi.object({
    companyName: Joi.string().required(),
    avatarURL: Joi.string(),
    companySize: Joi.string(),
    linkedInProfile: Joi.string(),
    industry: Joi.string(),
    title: Joi.string(),
  }).required(),

  selectedReferences: Joi.array()
    .items(
      Joi.object({
        referenceId: Joi.string().uuid().required(),
        personalEmailQuote: Joi.string().required(),
      }),
    )
    .required(),

  emailBody: Joi.string().required(),
});
