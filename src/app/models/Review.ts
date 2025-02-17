import mongoose, { Schema } from 'mongoose';

const reviewSchema = new Schema({
  content: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  movie: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Review = mongoose.models.Review || mongoose.model('Review', reviewSchema);