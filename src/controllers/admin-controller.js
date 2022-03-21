import { db } from "../models/db.js";
import { adminUtils } from "../utils/admin-utils.js";

export const adminController = {
  index: {
    handler: async function (request, h) {
      const placemarks = await db.placemarkStore.getAllPlacemarks();
      const regions = await db.regionsStore.getAllRegions();
      const users = await db.userStore.getAllUsers();
      const numberUsers = await adminUtils.numberUsers();
      const numberPlacemarks = await adminUtils.numberPlacemarks();
      const numberRegions = await adminUtils.numberRegions();
      const mostUserPlacemarks = await adminUtils.mostUserPlacemarks();
      const viewData = {
        title: "Admin Dashboard",
        placemarks: placemarks,
        regions: regions,
        users: users,
        numberUsers: numberUsers,
        numberPlacemarks: numberPlacemarks,
        numberRegions: numberRegions,
        mostUserPlacemarks: mostUserPlacemarks
      };
      return h.view("admin-dashboard-view", viewData);
    },
  },
};