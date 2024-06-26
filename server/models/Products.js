import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  gender: { type: String, required: true },
  category: {type : String, required: true},
  brand: String,
  stock: { type: Number, required: true },
  images: [String],
  colors: [String],
  sizes: [String],
  
},{timestamps: true});

const Product = mongoose.model("Product", productSchema);

export default Product;
