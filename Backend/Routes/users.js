const express = require("express");
const Routes = express.Router();
const usermodel = require("../models/authenticationmodel");
const postmodel = require("../models/postmodel");

Routes.get("/me", async (req, res) => {
  try {
    const user = await usermodel
      .findById(req.user.id)
      .select("-password")
      .lean();
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    user.posts = await postmodel
      .find({ author: req.user.id })
      .populate("category", "name")
      .sort({ createdAt: -1 });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

Routes.put("/me", async (req, res) => {
  try {
    const updates = {};
    if (typeof req.body.name === "string") {
      const name = req.body.name.trim();
      if (!name) {
        return res.status(400).send({ message: "Name cannot be empty" });
      }
      updates.name = name;
    }
    if (typeof req.body.bio === "string") {
      updates.bio = req.body.bio.trim();
    }

    const user = await usermodel
      .findByIdAndUpdate(req.user.id, updates, {
        new: true,
        runValidators: true,
      })
      .select("-password");
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

module.exports = Routes;
