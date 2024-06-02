import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Product",
  },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  
} ,{timestamps: true});

const Review = mongoose.model("Review", reviewSchema);

export default Review;
