const mongoose = require("mongoose");

const SchoolSchema = new mongoose.Schema(
  {
    schoolName: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("School", SchoolSchema);
