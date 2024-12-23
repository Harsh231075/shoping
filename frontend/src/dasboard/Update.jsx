import React, { useState } from "react";
import { useProducts } from "../context/ContentProvider";
import UpdateProduct from "./UpdateProduct";

const ProductList = () => {
  const { products } = useProducts();
  const [editingProductId, setEditingProductId] = useState(null);
  const [filterCategory, setFilterCategory] = useState("");

  // Filter products by selected category
  const filteredProducts = filterCategory
    ? products.filter((product) => product.category === filterCategory)
    : products;

  const handleEditClick = (_id) => {
    setEditingProductId(_id);
  };

  const handleCloseUpdate = () => {
    setEditingProductId(null);
  };

  return (
    <div className="p-6 bg-gradient-to-r from-indigo-50 to-blue-50 min-h-screen">
      {editingProductId ? (
        <UpdateProduct productId={editingProductId} onClose={handleCloseUpdate} />
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-xl max-w-7xl mx-auto">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">Product List</h1>

          {/* Category Filter */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="p-3 border rounded-lg w-full md:w-auto bg-gray-50 focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out"
            >
              <option value="">All Categories</option>
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
              <option value="Books">Books</option>
              <option value="Furniture">Furniture</option>
              <option value="Food">Food</option>
              <option value="Toys">Toys</option>
              <option value="Shoes">Shoes</option>
            </select>
            <button
              onClick={() => setFilterCategory("")}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all ease-in-out duration-300"
            >
              Clear Filter
            </button>
          </div>

          {/* Responsive Product Table */}
          <div className="overflow-x-auto bg-white rounded-lg shadow-md">
            <table className="min-w-full text-sm md:text-base">
              <thead>
                <tr className="bg-gradient-to-r from-blue-500 to-blue-700 text-white">
                  <th className="py-3 px-6 text-left">Product Name</th>
                  <th className="py-3 px-6 text-left">Category</th>
                  <th className="py-3 px-6 text-left">Price</th>
                  <th className="py-3 px-6 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <tr
                      key={product._id}
                      className="border-t hover:bg-gray-50 transition-all ease-in-out duration-300"
                    >
                      <td className="py-3 px-6 text-gray-700">{product.name}</td>
                      <td className="py-3 px-6 text-gray-700">{product.category}</td>
                      <td className="py-3 px-6 text-gray-700">${product.price}</td>
                      <td className="py-3 px-6">
                        <button
                          onClick={() => handleEditClick(product._id)}
                          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-all duration-300"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="text-center py-4 text-gray-600 text-sm md:text-base"
                    >
                      No products found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
