const mongoose = require("mongoose");

const tourSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name for this tour."],
      trim: true,
      unique: [true, "Name must be unique"],
      minLength: [3, "Name must be at least 3 character"],
      maxLength: [100, "Name is too large"],
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: [0, "Price can't be negative"],
    },
    tourSource: {
      type: String,
      required: true,
    },
    tourDestination: {
      type: String,
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;
