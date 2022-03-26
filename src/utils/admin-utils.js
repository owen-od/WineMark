import { db } from "../models/db.js";

export const adminUtils = {
  async numberUsers() {
    const users = await db.userStore.getAllUsers();
    let number = 0;
    for (let i = 0; i < users.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      number += 1
    }
    return number;
  },

  async numberPlacemarks() {
    const placemarks = await db.placemarkStore.getAllPlacemarks();
    let number = 0;
    for (let i = 0; i < placemarks.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      number += 1
    }
    return number;
  },

  async numberRegions() {
    const regions = await db.regionsStore.getAllRegions();
    let number = 0;
    for (let i = 0; i < regions.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      number += 1
    }
    return number;
  },

  async mostUserPlacemarks() {
    const users = await db.userStore.getAllUsers(); // get all users
    let mostPlacemarks = 0;
    for (let i = 0; i < users.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const userPlacemarks = await db.placemarkStore.getUserPlacemarks(users[i]._id)
      if (userPlacemarks.length > mostPlacemarks) {
        mostPlacemarks = userPlacemarks.length;
      }
    }
    return mostPlacemarks;
  } 
};