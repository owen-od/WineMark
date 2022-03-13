import { v4 } from "uuid";
// eslint-disable-next-line import/no-unresolved
import { JSONFile, Low } from "lowdb";

const db = new Low(new JSONFile("./src/models/json/regions.json"));
db.data = { regions: [] };

export const regionsJsonStore = {
  async getAllRegions() {
    await db.read();
    return db.data.regions;
  },

  async getOneRegion(name) {
    await db.read();
    let returnedRegion = db.data.regions.find((region) => region.name === name);
    if (!returnedRegion) {
      returnedRegion = null;
    }
    return returnedRegion;
  },

  async addRegion(region) {
    await db.read();
    region._id = v4();
    db.data.regions.push(region);
    await db.write();
    return region;
  },

  async deleteOneRegion(name) {
    await db.read();
    const index = db.data.regions.findIndex((region) => region.name === name);
    if (index !== -1) db.data.regions.splice(index, 1);
    await db.write();
  },

  async deleteAllRegions() {
    db.data.regions = [];
    await db.write();
  },
};