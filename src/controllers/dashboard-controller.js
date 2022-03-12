import { db } from "../models/db.js";
import { PlacemarkSpec } from "../models/joi-schemas.js";

export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const placemarks = await db.placemarkStore.getUserPlacemarks(loggedInUser._id);
      const regions = await db.regionsStore.getAllRegions();
      const viewData = {
        title: "Dashboard",
        user: loggedInUser,
        placemarks: placemarks,
        regions: regions
      };
      return h.view("dashboard-view", viewData);
    },
  },

  addPlacemark: {
    validate: {
      payload: PlacemarkSpec,
      options: { abortEarly: false },
      failAction: async function (request, h, error) {
        const loggedInUser = request.auth.credentials;
        const placemarks = await db.placemarkStore.getUserPlacemarks(loggedInUser._id);
        const regions = await db.regionsStore.getAllRegions();
        return h.view("dashboard-view", { title: "Add Placemark error", errors: error.details, placemarks: placemarks, regions: regions}).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const newPlacemark = {
        name: request.payload.name,
        latitude: request.payload.latitude,
        longitude: request.payload.longitude,
        region: request.payload.region, 
        description: request.payload.description,
        userid: loggedInUser._id,
      };
      await db.placemarkStore.addPlacemark(newPlacemark);
      return h.redirect("/dashboard");
    },
  },
};