const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken")
const Product = require("../models/productSchema");
const User = require("../models/userSchema");
const Order = require("../models/orderSchema");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

router.post("/create-checkout-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.items.map((item) => {
        return {
          price_data: {
            currency: "inr",
            product_data: {
              name: item.name,
            },
            unit_amount: item.price * 100,
          },
          quantity: item.quantity,
        };
      }),
      success_url: `${process.env.FRONTEND_URL}/success`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    });

   // Assuming you have the user ID and cart items in your request body
const { items } = req.body;
const token = req.headers.authorization?.split(" ")[1];
console.log(token)
let userId; // Declare userId variable

try {
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  console.log(decoded,"DECODED")
  userId = decoded.userId;
  console.log(userId, "USER ID")
} catch (error) {
    console.log(error)
  return res.status(401).json({ error: "Invalid token" });
}

// Calculate the total amount from cart items
const totalAmount = items.reduce(
  (total, item) => total + item.price * item.quantity,
  0
);

// Create the order in your database
const order = new Order({
  user: userId,
  products: items.map((item) => ({
    product: item.productId,
    quantity: item.quantity,
  })),
  totalAmount,
});

await order.save();

res.json({ url: session.url, order: order }); // Use 'order' instead of 'savedOrder'
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
