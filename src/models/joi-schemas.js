import Joi from "joi";

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");

export const UserCredentialsSpec = Joi.object()
  .keys({
    email: Joi.string().email().example("homer@simpson.com").required(),
    password: Joi.string().example("secret").required(),
  })
  .label("UserCredentials");

export const UserSpec = UserCredentialsSpec.keys({
  firstName: Joi.string().example("Homer").required(),
  lastName: Joi.string().example("Simpson").required(),
}).label("UserDetails");

export const UserSpecPlus = UserSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("UserDetailsPlus");

export const UserArray = Joi.array().items(UserSpecPlus).label("UserArray");

export const PlacemarkSpec = Joi.object()
  .keys({
    name: Joi.string().required().example("Domaine Romanée Conti"),
    latitude: Joi.number().min(-90).max(90).required().example(47.162226),
    longitude: Joi.number().min(-180).max(180).required().example(4.95541),
    region: Joi.string().valid("Alsace", "Bordeaux", "Burgundy", "Beaujolais", "Champagne", "Cotes du Rhône", "Loire Valley").required().example("Burgundy"),
    description: Joi.string().required().example("Domaine de la Romanée-Conti, often abbreviated to DRC, is an estate in Burgundy, France that produces white and red wine. It is widely considered among the world's greatest wine producers, and DRC bottles are among the world's most expensive. It takes its name from the domaine's most famous vineyard, Romanée-Conti."),
    userid: IdSpec,
  }).label("Placemark");

export const PlacemarkSpecPlus = PlacemarkSpec.keys({
    _id: IdSpec,
    __v: Joi.number(),
  }).label("PlacemarkPlus");

export const PlacemarkArraySpec = Joi.array().items(PlacemarkSpecPlus).label("PlacemarkArray");

export const RegionNameSpec = Joi.string().description("a valid region");

export const RegionSpec = Joi.object()
  .keys({
    name: Joi.string().required().example("Burgundy"),
    vintages: Joi.array().items(Joi.number()).required().example([2005, 2009, 2012, 2014, 2015, 2010, 2011, 1990, 1995, 1999]),
    grapes: Joi.array().items(Joi.string()).required().example(["Pinot Noir", "Gamay", "Chardonnay", "Aligoté"]),
  }).label("Region");

export const RegionSpecPlus = RegionSpec.keys({
    _id: IdSpec,
    __v: Joi.number(),
  }).label("RegionPlus");

export const RegionArraySpec = Joi.array().items(RegionSpecPlus).label("RegionArray");

export const JwtAuth = Joi.object()
  .keys({
    success: Joi.boolean().example("true").required(),
    token: Joi.string().example("eyJhbGciOiJND.g5YmJisIjoiaGYwNTNjAOhE.gCWGmY5-YigQw0DCBo").required(),
  }).label("JwtAuth");



