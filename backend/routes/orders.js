const express = require('express');
const User = require('../models/User')
const Order = require('../models/Order');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware')

// Place an order
router.post('/place', authMiddleware, async (req, res) => {
  const { userId, items, totalAmount, paymentStatus } = req.body;
  console.log(userId);
  console.log(userId, items, totalAmount, paymentStatus);
  try {
    // Step 1: Create a new Order
    const newOrder = new Order({ user: userId, items, totalAmount, paymentStatus });
    const savedOrder = await newOrder.save();
    console.log(savedOrder._id)
    // Step 2: Add this order to the User's orderHistory
    await User.findByIdAndUpdate(userId, { $push: { orderHistory: savedOrder._id } });

    res.status(201).json({ message: 'Order placed successfully', order: savedOrder });
  } catch (error) {
    res.status(500).json({ message: 'Error placing order', error });
  }
});

// Fetch user order history
router.get('/history/:userId', authMiddleware, async (req, res) => {
  const { userId } = req.params;

  try {
    // Validate if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Fetch orders and populate product details
    const orders = await Order.find({ user: userId }).populate('items.productId', 'name');

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: 'No orders found for this user' });
    }

    // Prepare response with flat objects
    const formattedOrders = orders.map(order =>
      order.items.map(item => ({
        date: order.createdAt.toISOString().split('T')[0], // Format date as YYYY-MM-DD
        totalAmount: order.totalAmount,
        paymentStatus: order.paymentStatus,
        productId: item.productId._id,
        productName: item.productId.name,
        quantity: item.quantity,
        price: item.price,
      }))
    ).flat(); // Flatten nested arrays into a single array of objects

    res.status(200).json({
      message: 'Order history fetched successfully',
      orders: formattedOrders,
    });
  } catch (error) {
    console.error('Error fetching order history:', error);
    res.status(500).json({ message: 'Error fetching order history', error });
  }
});





module.exports = router;