import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  movieId: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  rating: { type: Number, required: true },
  reviewText: { type: String, required: true },
});

export default mongoose.models.Review || mongoose.model('Review', reviewSchema);
