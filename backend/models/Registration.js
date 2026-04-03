const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,           // prevents duplicate emails at DB level too
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Phone is required"],
      trim: true,
    },
    branch: {
      type: String,
      required: [true, "Branch is required"],
    },
    year: {
      type: String,
      required: [true, "Year is required"],
    },
    event: {
      type: String,
      required: [true, "Event is required"],
    },
  },
  {
    timestamps: true, 
  }
);

module.exports = mongoose.model("registration_users", registrationSchema);