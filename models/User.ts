import mongoose, { Schema, Model } from "mongoose";

export interface IUser {
  googleId: string;
  name: string;
  email: string;
  image?: string;
  phone?: string;
  addresses: {
    label: string;
    address: string;
    city: string;
    isDefault: boolean;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const AddressSchema = new Schema(
  {
    label: {
      type: String,
      default: "Home",
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    isDefault: {
      type: Boolean,
      default: false,
    },
  },
  { _id: true }
);

const UserSchema = new Schema<IUser>(
  {
    googleId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    image: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      default: "",
      match: [/^[6-9]\d{9}$/, "Enter a valid Indian mobile number"],
    },
    addresses: {
      type: [AddressSchema],
      default: [],
    },
  },
  { timestamps: true }
);

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;