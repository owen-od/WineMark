import Joi from "joi";

export const UserSpec = {
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
};

export const UserCredentialsSpec = {
    email: Joi.string().email().required(),
    password: Joi.string().required(),
};

export const PlacemarkSpec= {
    name: Joi.string().required(),
    latitude: Joi.number().min(-90).max(90).required(),
    longitude: Joi.number().min(-180).max(180).required(),
    region: Joi.string().valid("Alsace", "Bordeaux", "Burgundy", "Beaujolais", "Champagne", "Cotes du Rhône", "Loire Valley").required(),
    description: Joi.string().required(),
}