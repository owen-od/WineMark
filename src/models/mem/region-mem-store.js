import { v4 } from "uuid";

let regions = [];

export const regionsMemStore = {
  async getAllRegions() {
    return regions;
  },

  async addRegion(region) {
    region._id = v4();
    regions.push(region);
    return region;
  },

  async getOneRegion(name) {
    let returnedRegion = regions.find((region) => region.name === name);
    if (!returnedRegion) {
      returnedRegion = null;
    }
    return returnedRegion
  },

  async deleteOneRegion(name) {
    const index = regions.findIndex((region) => region.name === name);
    if (index !== -1) regions.splice(index, 1);
  },

  async deleteAllRegions() {
    regions = [];
  },

}
