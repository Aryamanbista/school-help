const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true, trim: true },
    phone: { type: String },
    role: {
      type: String,
      enum: ["Volunteer", "School Admin", "System Admin"],
      required: true,
    },

    // Volunteer-specific fields
    occupation: {
      type: String,
      required: function () {
        return this.role === "Volunteer";
      },
    },
    dateOfBirth: { type: Date },

    // SchoolAdmin-specific fields
    position: {
      type: String,
      required: function () {
        return this.role === "School Admin";
      },
    },
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: function () {
        return this.role === "School Admin";
      },
    },
  },
  { timestamps: true }
);

// Hash password before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare entered password with hashed password
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);
