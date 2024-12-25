import React, { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const fetchStats = async () => {
    try {
      const response = await axios.get(
        "https://shoping-txma.onrender.com/api/record/dashboard-stats",
        {
          params: { startDate, endDate },
        }
      );
      console.log(response.data);
      setStats(response.data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="container mx-auto p-6 bg-gradient-to-r from-blue-50 to-indigo-50 min-h-screen">
      <h1 className="text-4xl font-extrabold text-center text-blue-700 mb-8">Revenue Dashboard</h1>

      <div className="flex flex-wrap justify-between items-center gap-4 mb-8 bg-white p-6 rounded-lg shadow-lg">
        <div className="flex flex-col w-full sm:w-auto">
          <label className="text-sm font-medium text-gray-600 mb-2">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all ease-in-out duration-300"
          />
        </div>
        <div className="flex flex-col w-full sm:w-auto">
          <label className="text-sm font-medium text-gray-600 mb-2">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all ease-in-out duration-300"
          />
        </div>
        <button
          onClick={fetchStats}
          className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg shadow-md hover:from-blue-700 hover:to-blue-800 transition-all ease-in-out duration-300"
        >
          Apply Filter
        </button>
      </div>

      {stats ? (
        <div className="bg-white p-6 shadow-xl rounded-lg">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-100 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all ease-in-out duration-300">
              <p className="text-sm text-gray-600">Total Products Sold</p>
              <p className="text-3xl font-semibold text-blue-700">{stats.totalProductsSold}</p>
            </div>
            <div className="bg-green-100 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all ease-in-out duration-300">
              <p className="text-sm text-gray-600">Total Revenue</p>
              <p className="text-3xl font-semibold text-green-700">${stats.totalRevenue}</p>
            </div>
            {/* New Total Users Section */}
            <div className="bg-yellow-100 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all ease-in-out duration-300">
              <p className="text-sm text-gray-600">Total Users</p>
              <p className="text-3xl font-semibold text-yellow-700">{stats.totalUsers}</p>
            </div>
          </div>

          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Top-Selling Products</h2>
          <div className="overflow-x-auto shadow-md rounded-lg">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">Product Name</th>
                  <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">Quantity Sold</th>
                </tr>
              </thead>
              <tbody>
                {stats.topSellingProducts.map((product) => (
                  <tr key={product.productId} className="border-t hover:bg-gray-50 transition-all ease-in-out duration-300">
                    <td className="py-3 px-6 text-gray-600">{product.name}</td>
                    <td className="py-3 px-6 text-gray-600">{product.totalQuantitySold}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center min-h-[200px]">
          <p className="text-gray-500 text-lg">Loading stats...</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
