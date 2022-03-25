import { db } from "../models/db.js";
import { imageStore } from "../models/image-store.js";

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

  deletePlacemark: {
    handler: async function(request, h) {
      const placemark = await db.placemarkStore.getPlacemarkById(request.params.id)
      await db.placemarkStore.deletePlacemarkById(placemark._id);
      return h.redirect("/dashboard");
    },
  },

  uploadImage: {
    handler: async function(request, h) {
      try {
        const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
        const file = request.payload.imagefile;
        if (Object.keys(file).length > 0) {
          const url = await imageStore.uploadImage(request.payload.imagefile);
          placemark.img = url;
          db.placemarkStore.updatePlacemark(placemark);
        }
        return h.redirect(`/placemark/${placemark._id}`);
      } catch (err) {
        console.log(err);
        return h.redirect(`/placemark/${placemark._id}`);
      }
    },
    payload: {
      multipart: true,
      output: "data",
      maxBytes: 209715200,
      parse: true
    }
  }
};