import { db } from "../models/db.js";

export const placemarkController = {
  index: {
    handler: async function (request, h) {
      const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
      const region = await db.regionsStore.getOneRegion(placemark.region);
      const viewData = {
        title: placemark.name,
        placemark: placemark,
        region: region
      };
      return h.view("placemark-view", viewData);
    },
  },
};