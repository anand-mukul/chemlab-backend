import mongoose, { Schema } from "mongoose";

const chemicalSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  formula: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
});

export const Chemical = mongoose.model("Chemical", chemicalSchema);
