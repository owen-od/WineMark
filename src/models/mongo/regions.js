import Mongoose from "mongoose";

const { Schema } = Mongoose;

const regionSchema = new Schema({
  name: String,
  vintages: Array,
  grapes: Array,
});

export const Region = Mongoose.model("Region", regionSchema);
