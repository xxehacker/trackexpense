const asyncHandler = require("express-async-handler");
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

const userControllers = {
  // Registration controller
  register: asyncHandler(async (req, res) => {
    try {
      const { username, email, password } = req.body;

      if (!username || !email || !password) {
        return res.status(400).json({ message: "Please fill all the fields" });
      }

      const emailValidation = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (!emailValidation.test(email)) {
        return res.status(400).json({ message: "Please enter a valid email" });
      }

      if (password.length < 6) {
        return res
          .status(400)
          .json({ message: "Password must be at least 6 characters long" });
      }

      if (username.length < 4) {
        return res
          .status(400)
          .json({ message: "Username must be at least 4 characters long" });
      }

      const userExits = await User.findOne({ email });
      const usernameExits = await User.findOne({ username });

      if (userExits || usernameExits) {
        return res.status(400).json({ message: "User already exists" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const userCreated = await User.create({
        email,
        username,
        password: hashedPassword,
      });

      return res.status(200).json({
        username: userCreated.username,
        email: userCreated.email,
        id: userCreated._id,
      });
    } catch (error) {
      console.error("Registration Error:", error.message);
      return res.status(500).json({ message: "Internal server error" });
    }
  }),

  // Login controller
  login: asyncHandler(async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: "Please fill all the fields" });
      }

      const loginUser = await User.findOne({ email });
      if (!loginUser) {
        return res.status(400).json({ message: "Invalid login credentials" });
      }

      const isMatch = await bcrypt.compare(password, loginUser.password);

      if (!isMatch) {
        return res.status(400).json({ message: "Invalid login credentials" });
      }

      // Generate token
      const token = jwt.sign({ id: loginUser._id }, JWT_SECRET, {
        expiresIn: "15d",
      });

      return res.status(200).json({
        message: "Login successful",
        username: loginUser.username,
        email: loginUser.email,
        id: loginUser._id,
        token,
      });
    } catch (error) {
      console.error("Login Error:", error.message);
      return res.status(500).json({ message: "Internal server error" });
    }
  }),

  // Profile controller
  profile: asyncHandler(async (req, res) => {
    try {
      const user = await User.findById(req.user);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.status(200).json({
        username: user.username,
        email: user.email,
      });
    } catch (error) {
      console.error("Error fetching profile:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }),

  // update username and email
  update: asyncHandler(async (req, res) => {
    try {
      const { username, email } = req.body;

      if (!username && !email) {
        return res.status(400).json({ message: "Please fill all the fields" });
      }

      const user = await User.findById(req.user);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      if (user.username === username && user.email === email) {
        return res
          .status(400)
          .json({ message: "Username and email cannot be the same" });
      }
      user.username = username || user.username;
      user.email = email || user.email;
      await user.save();

      return res.status(200).json({
        message: "Profile updated successfully",
        username: user.username,
        email: user.email,
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }),
};

module.exports = userControllers;
