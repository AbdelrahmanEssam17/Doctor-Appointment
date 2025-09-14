import mongoose, { Schema, model, Types } from "mongoose";

const reviewSchema = new Schema(
  {
    comment: {
      type: String,
      trim: true
    },
    user: {
      type: Types.ObjectId,
      ref: "patient", // make sure your patient model name is exactly "patient"
      required: true
    },
    rate: {
      type: Number,
      min: 0,
      max: 5,
      required: true
    }
  },
  { timestamps: true }
);

const reviewModel = mongoose.models.Review || model("Review", reviewSchema);
export default reviewModel;