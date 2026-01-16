import Joi from "joi";

export const updateProfileSchema = Joi.object({
  name: Joi.string().min(2),
  email: Joi.string().email(),
}).min(1);
