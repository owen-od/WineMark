import { Placemark } from "./placemark.js";

export const placemarkMongoStore = {
    async getAllPlacemarks() {
      const placemarks = await Placemark.find().lean();
      return placemarks;
    },
  
    async getPlacemarkById(id) {
      if (id) {
        const placemark = await Placemark.findOne({ _id: id }).lean();
        if (!placemark) {
          return null;
        }
        return placemark;
      }
      return null;
    },
  
    async addPlacemark(placemark) {
      const newPlacemark = new Placemark(placemark);
      const placemarkObj = await newPlacemark.save();
      return this.getPlacemarkById(placemarkObj._id);
    },
  
    async getUserPlacemarks(userid) {
      const placemark = await Placemark.find({ userid: userid }).lean();
      return placemark;
    },

    async deleteUserPlacemarks(userid) {
      const userPlacemarks = await Placemark.find({ userid: userid }).lean(); 
      for (let i = 0; i < userPlacemarks.length; i += 1) {
        try {
          // eslint-disable-next-line no-await-in-loop
          await Placemark.deleteOne({ _id: userPlacemarks[i]._id });
        } catch (error) {
          console.log("bad id");
        }
      }
    },

    async getPlacemarksByRegion(region) {
      const placemarks = await Placemark.find({ region: region }).lean();
      return placemarks;
    },
  
    async deletePlacemarkById(id) {
      try {
        await Placemark.deleteOne({ _id: id });
      } catch (error) {
        console.log("bad id");
      }
    },
  
    async deleteAllPlacemarks() {
      await Placemark.deleteMany({});
    },

    async editPlacemark(placemarkId, newPlacemark) {
      const placemark = await Placemark.findOne({ _id: placemarkId });
      placemark.name = newPlacemark.name;
      placemark.latitude = newPlacemark.latitude;
      placemark.longitude = newPlacemark.longitude;
      placemark.region = newPlacemark.region; 
      placemark.description =  newPlacemark.description;
      await placemark.save();
    },

    async updatePlacemark(updatedPlacemark) {
      const placemark = await Placemark.findOne({ _id: updatedPlacemark._id });
      placemark.title = updatedPlacemark.title;
      placemark.img = updatedPlacemark.img;
      await placemark.save();
    },
  };
