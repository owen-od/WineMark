import Boom from "@hapi/boom";
import { PlacemarkSpec, PlacemarkSpecPlus, PlacemarkArraySpec, IdSpec  } from "../models/joi-schemas.js";
import { db } from "../models/db.js";
import { validationError } from "./logger.js";

export const placemarkApi = {
  find: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const placemarks = await db.placemarkStore.getAllPlacemarks();
        return placemarks;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Get all placemarkApi",
    notes: "Returns all placemarkApi",
    response: { schema: PlacemarkArraySpec, failAction: validationError },
  },

  findOne: {
    auth: {
      strategy: "jwt",
    },
    async handler(request) {
      try {
        const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
        if (!placemark) {
          return Boom.notFound("No Placemark with this id");
        }
        return placemark;
      } catch (err) {
        return Boom.serverUnavailable("No Placemark with this id");
      }
    },
    tags: ["api"],
    description: "Find a Placemark",
    notes: "Returns a placemark",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: PlacemarkSpecPlus, failAction: validationError },
  },

  create: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const placemark = request.payload;
        const newPlacemark = await db.placemarkStore.addPlacemark(placemark);
        if (newPlacemark) {
          return h.response(newPlacemark).code(201);
        }
        return Boom.badImplementation("error creating placemark");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Create a placemark",
    notes: "Returns the newly created placemark",
    validate: { payload: PlacemarkSpec },
    response: { schema: PlacemarkSpecPlus, failAction: validationError },
  },

  deleteOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
        if (!placemark) {
          return Boom.notFound("No Placemark with this id");
        }
        await db.placemarkStore.deletePlacemarkById(placemark._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No Placemark with this id");
      }
    },
    tags: ["api"],
    description: "Delete a placemark",
    validate: { params: { id: IdSpec }, failAction: validationError },
  },

  deleteAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        await db.placemarkStore.deleteAllPlacemarks();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all placemarkApi",
  },

  uploadImage: {
    auth: {
      strategy: "jwt",
    },
    handler: async function(request, h) {
      try {
        const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
        placemark.img = request.payload.img;
        const updatedPlacemark = db.placemarkStore.updatePlacemark(placemark);
        if (updatedPlacemark) {
          return h.response(updatedPlacemark).code(201);
        }
        return Boom.badImplementation("error updating placemark");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
      },
      tags: ["api"],
      description: "Add or update placemark image",
      notes: "Returns the newly updated placemark",
    },

  edit: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
        const updatedPlacemark = {
          name: request.payload.name,
          latitude: request.payload.latitude,
          longitude: request.payload.longitude,
          region: request.payload.region, 
          description: request.payload.description,
          image: request.payload.image,
        };
        const newPlacemark = await db.placemarkStore.editPlacemark(placemark._id, updatedPlacemark);
        if (newPlacemark) {
          return h.response(newPlacemark).code(201);
        }
        return Boom.badImplementation("error updating placemark");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Update a placemark",
    notes: "Returns the newly updated placemark",
    // validate: { payload: PlacemarkSpec },
    // response: { schema: Pla
  },
};