import mongoose, { Schema, Model } from "mongoose";

export interface IBooking {
  bookingId: string;
  userId: mongoose.Types.ObjectId;
  customerName: string;
  phone: string;

  service: "cleaning" | "laundry" | "cooking";
  plan: "one-time" | "monthly";

  location: string;
  address: string;

  preferredDate: Date;
  preferredTime: string;

  requirements?: string;

  status:
  | "pending"
  | "confirmed"
  | "assigned"
  | "in-progress"
  | "completed"
  | "cancelled";

  cancellationRequest?: {
    reason: string;
    status: "pending" | "approved" | "rejected";
    requestedAt: Date;
  };

  paymentStatus: "unpaid" | "pending" | "paid";

  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema = new Schema<IBooking>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    bookingId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    customerName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    phone: {
      type: String,
      required: true,
      match: /^[6-9]\d{9}$/,
    },

    service: {
      type: String,
      required: true,
      enum: ["cleaning", "laundry", "cooking"],
    },

    plan: {
      type: String,
      required: true,
      enum: ["one-time", "monthly"],
    },

    location: {
      type: String,
      required: true,
      enum: ["vrindavan"],
    },

    address: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },

    preferredDate: {
      type: Date,
      required: true,
    },

    preferredTime: {
      type: String,
      required: true,
    },

    requirements: {
      type: String,
      trim: true,
      maxlength: 1000,
      default: "",
    },

    status: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "assigned",
        "in-progress",
        "completed",
        "cancelled",
      ],
      default: "pending",
    },

    cancellationRequest: {
      reason: {
        type: String,
        trim: true,
        maxlength: 500,
      },
      status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
      },
      requestedAt: {
        type: Date,
      },
    },

    paymentStatus: {
      type: String,
      enum: ["unpaid", "pending", "paid"],
      default: "unpaid",
    },
  },
  {
    timestamps: true,
  }
);

const Booking: Model<IBooking> =
  mongoose.models.Booking ||
  mongoose.model<IBooking>("Booking", BookingSchema);

export default Booking;