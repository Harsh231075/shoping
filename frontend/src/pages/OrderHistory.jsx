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
        const response = await axios.get(`http://localhost:4001/api/orders/history/${userId}`, {
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
    <div className="container mx-auto mt-20 px-4 py-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Order History</h1>

      {/* Date Range Filter */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border p-2 rounded w-full sm:w-auto max-w-xs"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border p-2 rounded w-full sm:w-auto max-w-xs"
        />
        <button
          onClick={handleFilter}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full sm:w-auto"
        >
          Filter
        </button>
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded shadow-md">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-2 px-4">Product Name</th>
              <th className="py-2 px-4">Quantity</th>
              <th className="py-2 px-4">Total Amount</th>
              <th className="py-2 px-4">Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order, index) => (
              <tr key={index} className="border-t">
                <td className="py-2 px-4 text-sm sm:text-base">{order.productName || "N/A"}</td>
                <td className="py-2 px-4 text-sm sm:text-base">{order.quantity || "0"}</td>
                <td className="py-2 px-4 text-sm sm:text-base">${order.totalAmount || "0.00"}</td>
                <td className="py-2 px-4 text-sm sm:text-base">{order.date || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderHistory;
