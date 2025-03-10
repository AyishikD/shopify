import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  clerkId: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  firstName: String,
  lastName: String,
  profileImageUrl: String,
  // Add any additional fields you need
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', UserSchema);