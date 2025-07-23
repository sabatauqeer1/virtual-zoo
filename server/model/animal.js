import mongoose from "mongoose";
const AnimalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },

  id: {
    type: Number,
    required: true,
    unique: true,
  },
});

export const Animal = mongoose.model("Animal", AnimalSchema);
