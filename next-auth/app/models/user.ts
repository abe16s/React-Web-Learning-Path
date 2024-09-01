import mongoose, { Schema, Document, Model } from 'mongoose';

// Define the IUser interface
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
  // Add any other fields you have in your schema
}

// Create the User schema
const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  role: { type: String, default: 'User' },
}, {
  timestamps: true,
});

// Create or retrieve the User model
const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', userSchema);

export default User;
