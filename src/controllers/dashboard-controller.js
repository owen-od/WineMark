import { db } from "../models/db.js";

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