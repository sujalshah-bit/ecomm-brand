const express = require('express')
const router = express.Router()
const Product = require("../models/productSchema");
const User = require("../models/userSchema");


// Define your route for creating a product
router.post("/products", async (req, res) => {
    try {
      // Check if the user is an admin
      const adminUser = await User.findOne({ _id: req.user.id, role: "admin" });
  
      if (!adminUser) {
        return res.status(403).json({ message: "You are not authorized to create a product." });
      }
  
      // Extract the data from the request body
      const data = req.body.data; 
  
      // Add the admin user's ID as the seller
      data.seller = adminUser._id;
  
      // Create the product
      const newProduct = new Product(data);
  
      const savedProduct = await newProduct.save();
      res.status(201).json(savedProduct);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  });
  






module.exports = router