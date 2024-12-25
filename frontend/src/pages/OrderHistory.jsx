import React, { useState, useEffect } from "react";
import axios from "axios";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const userId = localStorage.getItem("userId"); // Get userId from localStorage
  const token = localStorage.getItem("authToken");

  // Fetch orders from API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`https://shoping-txma.onrender.com/api/orders/history/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(response.data.orders);
        setFilteredOrders(response.data.orders); // Initialize filteredOrders with all orders
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, [userId, token]);

  // Filter orders by date range
  const handleFilter = () => {
    const filtered = orders.filter((order) => {
      const orderDate = new Date(order.date);
      const start = new Date(startDate);
      const end = new Date(endDate);
      return orderDate >= start && orderDate <= end;
    });
    setFilteredOrders(filtered);
  };

  return (
    <div className="container mx-auto mt-16 px-6 py-8">
      <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">Order History</h1>

      {/* Date Range Filter */}
      <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border p-3 rounded-md w-full sm:w-auto max-w-xs text-gray-700 focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border p-3 rounded-md w-full sm:w-auto max-w-xs text-gray-700 focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleFilter}
          className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition-colors w-full sm:w-auto"
        >
          Filter
        </button>
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="min-w-full bg-white border-separate border-spacing-0 text-gray-800">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-600">Product Name</th>
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-600">Quantity</th>
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-600">Total Amount</th>
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-600">Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order, index) => (
              <tr
                key={index}
                className={`border-t ${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100 transition-colors`}
              >
                <td className="py-3 px-6 text-sm sm:text-base">{order.productName || "N/A"}</td>
                <td className="py-3 px-6 text-sm sm:text-base">{order.quantity || "0"}</td>
                <td className="py-3 px-6 text-sm sm:text-base">${order.totalAmount || "0.00"}</td>
                <td className="py-3 px-6 text-sm sm:text-base">{order.date || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderHistory;
