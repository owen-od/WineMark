import { v4 } from "uuid";
// eslint-disable-next-line import/no-unresolved
import { JSONFile, Low } from "lowdb";

const db = new Low(new JSONFile("./src/models/json/placemarks.json"));
db.data = { placemarks: [] };

export const placemarkJsonStore = {
  async getAllPlacemarks() {
    await db.read();
    return db.data.placemarks;
  },

  async addPlacemark(placemark) {
    await db.read();
    placemark._id = v4();
    db.data.placemarks.push(placemark);
    await db.write();
    return placemark;
  },

  async getPlacemarkById(id) {
    await db.read();
    let place = db.data.placemarks.find((placemark) => placemark._id === id);
    if (!place) {
      place = null;
    }
    return place;
  },

  async getPlacemarksByRegion(region) {
    const placemarks = db.data.placemarks.filter((placemark) => placemark.region === region)
    return placemarks;
  },

  async getUserPlacemarks(userid) {
    await db.read();
    return db.data.placemarks.filter((placemark) => placemark.userid === userid);
  },

  async deleteUserPlacemarks(userid) {
    await db.read();
    const userPlacemarks = db.data.placemarks.filter((placemark) => placemark.userid === userid);
    for (let i = 0; i < userPlacemarks.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const index = db.data.placemarks.findIndex((placemark) => placemark._id === userPlacemarks[i]._id);
      if (index !== -1) db.data.placemarks.splice(index, 1);
    }
    await db.write();
  },

  async deletePlacemarkById(id) {
    await db.read();
    const index = db.data.placemarks.findIndex((placemark) => placemark._id === id);
    if (index !== -1) db.data.placemarks.splice(index, 1);
    await db.write();
  },

  async deleteAllPlacemarks() {
    db.data.placemarks = [];
    await db.write();
  },
};