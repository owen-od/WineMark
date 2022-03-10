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
    const returnedRegion = db.data.regions.find((region) => region.name === name);
    return returnedRegion;
  },
};