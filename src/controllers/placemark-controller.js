import { db } from "../models/db.js";
import { imageStore } from "../models/image-store.js";
import { PlacemarkSpec } from "../models/joi-schemas.js";

export const placemarkController = {
  index: {
    handler: async function (request, h) {
      const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
      const region = await db.regionsStore.getOneRegion(placemark.region);
      const regions = await db.regionsStore.getAllRegions();
      const viewData = {
        title: placemark.name,
        placemark: placemark,
        region: region,
        regions: regions // this is needed for edit function if region must be changed
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

  editPlacemark: {
    validate: {
      payload: PlacemarkSpec,
      options: { abortEarly: false },
      failAction: async function (request, h, error) {
        const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
        const region = await db.regionsStore.getOneRegion(placemark.region);
        const regions = await db.regionsStore.getAllRegions();
        return h.view("placemark-view", { title: "Edit Placemark Error", errors: error.details, placemark: placemark, region: region, regions: regions}).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
      const newPlacemark = {
        name: request.payload.name,
        latitude: request.payload.latitude,
        longitude: request.payload.longitude,
        region: request.payload.region, 
        description: request.payload.description,
      };
      await db.placemarkStore.editPlacemark(placemark._id, newPlacemark);
      return h.redirect(`/placemark/${request.params.id}`);
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