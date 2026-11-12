import mongoose, { Schema, models, model } from "mongoose";

const notificationSchema = new Schema(
  {
    recipientType: {
      type: String,
      enum: ["admin", "customer"],
      required: true,
      index: true,
    },

    // Customer notifications belong to a specific user.
    // Admin notifications are shared with authorised admins.
    recipientId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
      index: true,
    },

    type: {
      type: String,
      enum: [
        "new-booking",
        "booking-confirmed",
        "professional-assigned",
        "service-started",
        "service-completed",
        "booking-cancelled",
        "cancellation-request",
        "cancellation-approved",
        "cancellation-rejected",
        "payment-updated",
        "general",
      ],
      default: "general",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },

    message: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },

    link: {
      type: String,
      default: null,
      maxlength: 300,
    },

    readAt: {
      type: Date,
      default: null,
    },

    // Optional reference to the related booking.
    bookingId: {
      type: String,
      default: null,
      index: true,
    },
  },
  { timestamps: true }
);

notificationSchema.index({ recipientType: 1, recipientId: 1, createdAt: -1 });
notificationSchema.index({ recipientType: 1, readAt: 1, createdAt: -1 });

const Notification =
  models.Notification || model("Notification", notificationSchema);

export default Notification;