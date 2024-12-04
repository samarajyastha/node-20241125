import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  brand: String,
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  urls: {
    type: [String],
  },
});

export default mongoose.model("Product", productSchema);
