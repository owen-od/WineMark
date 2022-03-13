import { Region } from "./regions.js";

export const regionsMongoStore = {
    async getAllRegions() {
      const regions = await Region.find().lean();
      return regions;
    },
  
    async getOneRegion(name) {
      if (name) {
        const region = await Region.findOne({ name: name }).lean();
        if (!region) {
          return null;
        }
        return region;
      }
      return null;
    },
  
    async addRegion(region) {
      const newRegion = new Region(region);
      const regionObj = await newRegion.save();
      return this.getOneRegion(regionObj.name);
    },
  
    async deleteOneRegion(name) {
      try {
        await Region.deleteOne({ name: name });
      } catch (error) {
        console.log("bad name");
      }
    },
  
    async deleteAllRegions() {
      await Region.deleteMany({});
    }
  };
