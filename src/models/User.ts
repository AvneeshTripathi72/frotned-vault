import mongoose, { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  fullName: { type: String },
  email: { type: String },
  avatar: { type: String },
  bio: { type: String },
  role: { type: String, default: "Prompt Engineer" },
  location: { type: String },
  website: { type: String },
  twitter: { type: String },
  github: { type: String },
  coins: { type: Number, default: 1000 },
  clerkId: { type: String },
  steamId: { type: String },
  purchasedPrompts: [{ type: Schema.Types.ObjectId, ref: 'Prompt' }],
  isVerified: { type: Boolean, default: false },
  stats: {
    totalSales: { type: Number, default: 0 },
    totalEarnings: { type: Number, default: 0 },
    rank: { type: String, default: "Silver" },
  },
  createdAt: { type: Date, default: Date.now },
});

const User = models.User || model('User', UserSchema);
export default User;
