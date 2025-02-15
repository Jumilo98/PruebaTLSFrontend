import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
});

export const User = mongoose.models.User || mongoose.model('User', userSchema);