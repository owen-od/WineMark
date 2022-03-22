import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { RegionSpec, RegionSpecPlus, RegionNameSpec, RegionArraySpec, PlacemarkArraySpec } from "../models/joi-schemas.js";
import { validationError } from "./logger.js";

export const regionApi = {
  find: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const regions = await db.regionsStore.getAllRegions();
        return regions;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    response: { schema: RegionArraySpec, failAction: validationError },
    description: "Get all regionApi",
    notes: "Returns all regions",
  },
  
  findOne: {
    auth: {
      strategy: "jwt",
    },
    async handler(request) {
      try {
        const region = await db.regionsStore.getOneRegion(request.params.name);
        if (!region) {
          return Boom.notFound("No Region with this name");
        }
        return region;
      } catch (err) {
        return Boom.serverUnavailable("No Region with this name");
      }
    },
    tags: ["api"],
    description: "Find a region",
    notes: "Returns a region",
    validate: { params: { name: RegionNameSpec }, failAction: validationError },
    response: { schema: RegionSpecPlus, failAction: validationError }
  },

  findPlacemarks: {
    auth: {
      strategy: "jwt",
    },
    async handler(request) {
      try {
        const region = await db.regionsStore.getOneRegion(request.params.name);
        if (!region) {
          return Boom.notFound("No Region with this name");
        }
        const placemarks = await db.placemarkStore.getPlacemarksByRegion(region.name);
        return placemarks;
      } catch (err) {
        return Boom.serverUnavailable("No Region with this name");
      }
    },
    tags: ["api"],
    description: "Find all region's placemarks",
    notes: "Returns regions placemarks",
    validate: { params: { name: RegionNameSpec }, failAction: validationError },
    response: { schema: PlacemarkArraySpec, failAction: validationError }
  },

  create: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const region = request.payload;
        const newRegion = await db.regionsStore.addRegion(region);
        if (newRegion) {
          return h.response(newRegion).code(201);
        }
        return Boom.badImplementation("error creating region");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Create a region",
    notes: "Returns the newly created region",
    validate: { payload: RegionSpec, failAction: validationError },
    response: { schema: RegionSpecPlus, failAction: validationError }

  },

  deleteAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        await db.regionsStore.deleteAllRegions();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all RegionApi",
  },

  deleteOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const region = await db.regionsStore.getOneRegion(request.params.name);
        if (!region) {
          return Boom.notFound("No Region with this name");
        }
        await db.regionsStore.deleteOneRegion(region.name);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No Region with this name");
      }
    },
    tags: ["api"],
    description: "Delete a region",
    validate: { params: { name: RegionNameSpec }, failAction: validationError },
  },
};