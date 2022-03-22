import axios from "axios";

import { serviceUrl } from "../fixtures.js";

export const placemarkService = {
  placemarkUrl: serviceUrl,

  async createUser(user) {
    const res = await axios.post(`${this.placemarkUrl}/api/users`, user);
    return res.data;
  },

  async getUser(id) {
    const res = await axios.get(`${this.placemarkUrl}/api/users/${id}`);
    return res.data;
  },

  async getAllUsers() {
    const res = await axios.get(`${this.placemarkUrl}/api/users`);
    return res.data;
  },

  async deleteAllUsers() {
    const res = await axios.delete(`${this.placemarkUrl}/api/users`);
    return res.data;
  },

  async authenticate(user) {
    const response = await axios.post(`${this.placemarkUrl}/api/users/authenticate`, user);
    axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
    return response.data;
  },

  async clearAuth() {
    axios.defaults.headers.common["Authorization"] = "";
  },

  async createPlacemark(placemark) {
    const res = await axios.post(`${this.placemarkUrl}/api/placemarks`, placemark);
    return res.data;
  },

  async deleteAllPlacemarks() {
    const response = await axios.delete(`${this.placemarkUrl}/api/placemarks`);
    return response.data;
  },

  async deletePlacemark(id) {
    const response = await axios.delete(`${this.placemarkUrl}/api/placemarks/${id}`);
    return response;
  },

  async getAllPlacemarks() {
    const res = await axios.get(`${this.placemarkUrl}/api/placemarks`);
    return res.data;
  },

  async getPlacemark(id) {
    const res = await axios.get(`${this.placemarkUrl}/api/placemarks/${id}`);
    return res.data;
  },

  async createRegion(region) {
    const res = await axios.post(`${this.placemarkUrl}/api/regions`, region);
    return res.data;
  },

  async deleteAllRegions() {
    const response = await axios.delete(`${this.placemarkUrl}/api/regions`);
    return response.data;
  },

  async deleteRegion(name) {
    const response = await axios.delete(`${this.placemarkUrl}/api/regions/${name}`);
    return response;
  },

  async getAllRegions() {
    const res = await axios.get(`${this.placemarkUrl}/api/regions`);
    return res.data;
  },

  async getRegion(name) {
    const res = await axios.get(`${this.placemarkUrl}/api/regions/${name}`);
    return res.data;
  },

  async getRegionPlacemarks(name) {
    const res = await axios.get(`${this.placemarkUrl}/api/regions/${name}/placemarks`);
    return res.data;
  },
}