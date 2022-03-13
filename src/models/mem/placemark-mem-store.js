import { v4 } from "uuid";

let placemarks = [];

export const placemarkMemStore = {
  async getAllPlacemarks() {
    return placemarks;
  },

  async addPlacemark(placemark) {
    placemark._id = v4();
    placemarks.push(placemark);
    return placemark;
  },

  async getPlacemarkById(id) {
    let place = placemarks.find((placemark) => placemark._id === id);
    if (!place) {
      place = null;
    }
    return place;
  },

  async getPlacemarksByRegion(region) {
    return placemarks.filter((placemark) => placemark.region === region);
  },

  async deletePlacemarkById(id) {
    const index = placemarks.findIndex((placemark) => placemark._id === id);
    if (index !== -1) placemarks.splice(index, 1);
  },

  async deleteAllPlacemarks() {
    placemarks = [];
  },

  async getUserPlaylists(userid) {
    return playlists.filter((playlist) => playlist.userid === userid);
  },
};