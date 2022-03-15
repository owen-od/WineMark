import Boom from "@hapi/boom";
import { db } from "../models/db.js";

export const regionApi = {
  find: {
    auth: false,
    handler: async function (request, h) {
      try {
        const regions = await db.regionsStore.getAllRegions();
        return regions;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },
  
  findOne: {
    auth: false,
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
  },

  create: {
    auth: false,
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
  },

  deleteAll: {
    auth: false,
    handler: async function (request, h) {
      try {
        await db.regionsStore.deleteAllRegions();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  deleteOne: {
    auth: false,
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
  },
};