import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../context/ContentProvider";

const UpdateProduct = ({ productId, onClose }) => {
  console.log(productId);
  const { products, updateProduct } = useProducts();
  const navigate = useNavigate();
  // Find the product by ID
  console.log(products)
  const product = products.find((p) => p._id === productId);
  console.log(product);
  const [formData, setFormData] = useState({
    name: product?.name || "",
    price: product?.price || "",
    category: product?.category || "",
  });

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateProduct(productId, formData); // Update through context API
    alert("Product updated successfully!");
    onClose();
  };

  // if (!product) return <p>Loading product...</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Update Product</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow rounded">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          >
            <option value="" disabled>Select category</option>
            {['Electronics', 'Clothing', 'Books', 'Furniture', 'Food', 'Toys', 'Shoes'].map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
