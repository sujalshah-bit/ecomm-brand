const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const User = require("../models/userSchema");
const router = express.Router();

// Signup API
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate input data
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ error: "Provide Name, Email, and Password" });
    }

    // Check If User Already Exists or Not
    if (await User.findOne({ email })) {
      return res.status(409).json({ error: "User Already Exist" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    // Generate a verification token
    const verificationToken = crypto.randomBytes(32).toString("hex");

    // Save the verification token in the user's document
    newUser.verificationToken = verificationToken;

    await newUser.save();

    // Send a verification email
    // const transporter = nodemailer.createTransport({
    //   service: "gmail",
    //   auth: {
    //     user: process.env.GMAIL,
    //     pass: process.env.GMAIL_PASSWORD,
    //   },
    // });

    // const emailContent = {
    //   from: process.env.GMAIL,
    //   to: email,
    //   subject: "Email Verification",
    //   html: `<p>Please click <a href="http://localhost:5000/auth/verify/${verificationToken}">here</a> to verify your email.</p>`,
    // };

    // transporter
    //   .sendMail(emailContent)
    //   .then(() => {
    //     return res
    //       .status(201)
    //       .json({
    //         message:
    //           "A verification email has been sent. Please check your inbox.",
    //       });
    //   })
    //   .catch((error) => {
    //     console.error("Error sending email:", error);
    //     return res.status(500).json({ error: "Signup failed" });
    //   });
    res.status(201).json({
      message: "Sign Up Successfully",
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({
      error: "Signup failed",
      message: "An error occurred during signup.",
    });
  }
});

// Login API
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Checks if Email and password is present or not
    if (!email || !password) {
      return res.status(401).json({ error: "Provide Email and Password" });
    }

    // Find the user by email
    const user = await User.findOne({ email });

    // Check if user exists and password matches
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Create a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
});

// Assuming you have a router setup
router.get("/verify/:token", async (req, res) => {
  try {
    const { token } = req.params;

    // Find the user by verification token
    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return res.status(404).json({ error: "Invalid or expired token." });
    }

    // Update user's verification status
    user.isEmailVerified = true;

    await user.save();
    res.status(200).json({ message: "Email verified successfully." });
  } catch (error) {
    console.log(error, "ERROR IN VERIFICATION OF TOKEN");
    res.status(500).json({ error: "Verification failed" });
  }
});

module.exports = router;
