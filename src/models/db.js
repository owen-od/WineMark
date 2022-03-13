import { userMemStore } from "./mem/user-mem-store.js";
import { placemarkMemStore } from "./mem/placemark-mem-store.js";
import { regionsMemStore } from "./mem/region-mem-store.js";

import { userJsonStore } from "./json/user-json-store.js";
import { placemarkJsonStore } from "./json/placemark-json-store.js";
import { regionsJsonStore } from "./json/regions-json-store.js";

export const db = {
  userStore: null,
  placemarkStore: null,
  regionsStore: null,

  init(storeType) {
    switch (storeType) {
      case "json":
        this.userStore = userJsonStore;
        this.placemarkStore = placemarkJsonStore;
        this.regionsStore = regionsJsonStore;
        break;
      default:
       this.userStore = userMemStore;
       this.placemarkStore = placemarkMemStore;
       this.regionsStore = regionsMemStore;
    }
  },
};