const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  liked: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    }
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    }
  ],
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order'
    }
  ],
  avatar: {
    type: String
  },
  role: {
    type: String,
    default: 'user',
    enum: ['user', 'admin']
  },
  shopName: {
    type: String,
    required: function () {
      return this.role === 'admin';
    }
  },
  transactions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
      required: function () {
        return this.role === 'admin';
      }
    }
  ],
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: function () {
        return this.role === 'admin';
      }
    }
  ]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
