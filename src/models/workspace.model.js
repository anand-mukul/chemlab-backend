import mongoose, { Schema } from "mongoose";

const workspaceSchema = new Schema({
  name: {
    type: String,
  },
  preview: {
    type: String,
  },
  instruments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Instrument",
    },
  ],
});

export const Workspace = mongoose.model("Workspace", workspaceSchema);
