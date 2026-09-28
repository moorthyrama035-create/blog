const express = require("express");
const Routes = express.Router();
const usermodel = require("../models/authenticationmodel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

Routes.post("/", async (req, res) => {
  try {
    const email =
      typeof req.body.email === "string" ? req.body.email.trim() : "";
    const password =
      typeof req.body.password === "string" ? req.body.password : "";
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await usermodel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user._id.toString() },
      process.env.JWT_SECRET,
      { expiresIn: "4h" },
    );
    return res.status(200).json({ message: "Valid credentials", token });
  } catch (error) {
    return res.status(500).json({ message: "Unable to sign in right now" });
  }
});
module.exports = Routes;
