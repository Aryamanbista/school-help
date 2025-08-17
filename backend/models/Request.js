const mongoose = require("mongoose");

const RequestSchema = new mongoose.Schema(
  {
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: true,
    },
    description: { type: String, required: true },
    requestStatus: {
      type: String,
      enum: ["NEW", "PENDING", "CLOSED"],
      default: "NEW",
    },
    requestType: {
      type: String,
      enum: ["Tutorial", "Resource"],
      required: true,
    },

    // Tutorial-specific
    proposedDate: { type: Date },
    proposedTime: { type: String },
    studentLevel: { type: String },
    numStudents: { type: Number },

    // Resource-specific
    resourceType: {
      type: String,
      enum: ["mobile device", "personal computer", "networking equipment"],
    },
    numRequired: { type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Request", RequestSchema);
