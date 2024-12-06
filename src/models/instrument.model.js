import mongoose, { Schema } from "mongoose";

const instrumentSchema = new Schema({
  name: {
    type: String,
  },
  icon: {
    type: String,
  },
  chemicals: [
    {
      type: Schema.Types.ObjectId,
      ref: "Chemical",
    },
  ],
});

export const Instrument = mongoose.model("Instrument", instrumentSchema);
