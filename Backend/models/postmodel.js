const mongoose = require("mongoose");
const Postschema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
    },
    image: String,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "service",
    },
    comments: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "service",
          required: true,
        },
        text: {
          type: String,
          required: true,
          trim: true,
          maxlength: 2000,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);
const Postmodel = mongoose.model("Post", Postschema);
module.exports = Postmodel;
