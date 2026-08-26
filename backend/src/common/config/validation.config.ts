import * as Joi from "joi";

export const ValidationCofig: Joi.ObjectSchema = Joi.object({
  DATABASE_URL: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRES_IN: Joi.number().default(1800),
  PORT: Joi.number().default(3000),
});
