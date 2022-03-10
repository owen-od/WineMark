import { v4 } from "uuid";

let regions = [];

export const regionMemStore = {
  async getAllRegions() {
    return regions;
  },

  async addRegion(region) {
    region._id = v4();
    regions.push(region);
    return regions;
  },

  async getOneRegion(name) {
    return regions.find((region) => region.name === name);
  },

}
