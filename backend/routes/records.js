const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const User = require('../models/User');

// GET /api/admin/dashboard-stats
router.get("/dashboard-stats", async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    // Date filter
    const dateFilter = {};
    if (startDate) dateFilter.$gte = new Date(startDate);
    if (endDate) dateFilter.$lte = new Date(endDate);

    const matchStage = Object.keys(dateFilter).length ? { createdAt: dateFilter } : {};

    // MongoDB aggregation for total stats
    const stats = await Order.aggregate([
      { $match: matchStage }, // Match stage for date filtering
      { $unwind: "$items" }, // Break items array into individual documents
      {
        $group: {
          _id: null,
          totalProductsSold: { $sum: "$items.quantity" }, // Total quantity sold
          totalRevenue: { $sum: { $multiply: ["$items.quantity", "$items.price"] } }, // Total revenue
        },
      },
    ]);

    // Aggregation for top-selling products
    const topProducts = await Order.aggregate([
      { $match: matchStage },
      { $unwind: "$items" },
      {
        $group: {
          _id: "$items.productId",
          totalQuantitySold: { $sum: "$items.quantity" },
        },
      },
      { $sort: { totalQuantitySold: -1 } }, // Sort by quantity sold
      { $limit: 5 },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      {
        $project: {
          _id: 0,
          productId: "$_id",
          name: { $arrayElemAt: ["$productDetails.name", 0] },
          totalQuantitySold: 1,
        },
      },
    ]);

    const Users = await User.countDocuments({ role: "user" }); // Count users with role "user"
    const Admins = await User.countDocuments({ role: "admin" }); // Count users with role "admin"

    res.json({
      totalProductsSold: stats[0]?.totalProductsSold || 0,
      totalRevenue: stats[0]?.totalRevenue || 0,
      topSellingProducts: topProducts,
      totalUsers: Users,
      totalAdmins: Admins
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;