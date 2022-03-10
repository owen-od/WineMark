// import { userMemStore } from "./mem/user-mem-store.js";
// import { placemarkMemStore } from "./mem/placemark-mem-store.js";

import { userJsonStore } from "./json/user-json-store.js";
import { placemarkJsonStore } from "./json/placemark-json-store.js";
import { regionsJsonStore } from "./json/regions-json-store.js";

export const db = {
  userStore: null,
  placemarkStore: null,
  regionsStore: null,

  init() {
    // this.userStore = userMemStore;
    // this.placemarkStore = placemarkMemStore;
    this.userStore = userJsonStore;
    this.placemarkStore = placemarkJsonStore;
    this.regionsStore = regionsJsonStore;
    // this.trackStore = trackJsonStore;
  },
};