import mongoose from 'mongoose';
const reviewSchema = new mongoose.Schema(
  {
    booking: { type: Schema.Types.ObjectId, ref: 'Booking', required: true },
    reviewer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    reviewee: { type: Schema.Types.ObjectId, ref: 'Profile', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: String,
  },
  {
    timestamps: true,
  }
);

const Review = mongoose.model('Review', reviewSchema);
export default Review;
