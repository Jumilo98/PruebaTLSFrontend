import mongoose, { Schema } from 'mongoose';

const movieSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  releaseDate: { type: Date, required: true },
  imdbId: { type: String, required: true, unique: true },
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
});

export const Movie = mongoose.models.Movie || mongoose.model('Movie', movieSchema);