import mongoose, { Schema } from "mongoose";

const reactionSchema = new Schema({
  reactants: {
    type: Array,
    required: true,
  },
  products: {
    type: Array,
    required: true,
  },
  equation: {
    type: String,
  },
});

export const Reaction = mongoose.model("Reaction", reactionSchema);
