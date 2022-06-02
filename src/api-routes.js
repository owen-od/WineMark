import { userApi } from "./api/user-api.js";
import { placemarkApi } from "./api/placemark-api.js";
import { regionApi } from "./api/region-api.js";

export const apiRoutes = [
  { method: "GET", path: "/api/users", config: userApi.find },
  { method: "POST", path: "/api/users", config: userApi.create },
  { method: "DELETE", path: "/api/users", config: userApi.deleteAll },
  { method: "GET", path: "/api/users/{id}", config: userApi.findOne },
  { method: "POST", path: "/api/users/authenticate", config: userApi.authenticate },

  { method: "POST", path: "/api/placemarks", config: placemarkApi.create },
  { method: "DELETE", path: "/api/placemarks", config: placemarkApi.deleteAll },
  { method: "GET", path: "/api/placemarks", config: placemarkApi.find },
  { method: "GET", path: "/api/placemarks/{id}", config: placemarkApi.findOne },
  { method: "DELETE", path: "/api/placemarks/{id}", config: placemarkApi.deleteOne },
  { method: "POST", path: "/api/placemarks/{id}", config: placemarkApi.uploadImage },

  { method: "GET", path: "/api/regions", config: regionApi.find },
  { method: "GET", path: "/api/regions/{name}", config: regionApi.findOne },
  { method: "GET", path: "/api/regions/{name}/placemarks", config: regionApi.findPlacemarks },
  { method: "POST", path: "/api/regions", config: regionApi.create },
  { method: "DELETE", path: "/api/regions", config: regionApi.deleteAll },
  { method: "DELETE", path: "/api/regions/{name}", config: regionApi.deleteOne },
];