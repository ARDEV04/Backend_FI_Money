import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    type: { type: String, required: true, trim: true },
    sku: { type: String, required: true, unique: true, trim: true },
    image_url: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    quantity: { type: Number, required: true, min: 0 },
    price: { type: Number, required: true, min: 0 },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Product", productSchema);
