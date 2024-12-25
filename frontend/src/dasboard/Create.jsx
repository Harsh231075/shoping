import React, { useState } from "react";
import toast from "react-hot-toast";

const Create = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    discountPrice: "",
    images: ["", "", "", "", ""], // Initialize with 5 empty URLs
    category: "Electronics", // Default category
    brand: "",
    stock: "",
    tags: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (index, value) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData({ ...formData, images: newImages });
  };

  const handleTagChange = (e) => {
    setFormData({ ...formData, tags: e.target.value.split(",") });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation for images
    if (formData.images.filter((url) => url.trim() !== "").length < 5) {
      alert("Please provide at least 5 image URLs.");
      return;
    }

    try {
      const response = await fetch("https://shoping-txma.onrender.com/api/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Product added successfully!");
        setFormData({
          name: "",
          description: "",
          price: "",
          discountPrice: "",
          images: ["", "", "", "", ""],
          category: "Electronics",
          brand: "",
          stock: "",
          tags: [],
        });
      } else {
        toast.error("Failed to add product.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg shadow-xl">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div className="form-group">
          <label className="block text-lg font-medium text-gray-700 mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Description */}
        <div className="form-group">
          <label className="block text-lg font-medium text-gray-700 mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Price and Discount Price */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="form-group">
            <label className="block text-lg font-medium text-gray-700 mb-2">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div className="form-group">
            <label className="block text-lg font-medium text-gray-700 mb-2">Discount Price</label>
            <input
              type="number"
              name="discountPrice"
              value={formData.discountPrice}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Images */}
        <div className="form-group">
          <label className="block text-lg font-medium text-gray-700 mb-2">Images (5 URLs)</label>
          {formData.images.map((url, index) => (
            <input
              key={index}
              type="url"
              placeholder={`Image URL ${index + 1}`}
              value={url}
              onChange={(e) => handleImageChange(index, e.target.value)}
              required
              className="w-full px-4 py-3 border rounded-lg shadow-sm mt-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          ))}
        </div>

        {/* Category */}
        <div className="form-group">
          <label className="block text-lg font-medium text-gray-700 mb-2">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            {["Electronics", "Clothing", "Books", "Furniture", "Food", "Toys", "Shoes"].map(
              (category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              )
            )}
          </select>
        </div>

        {/* Brand */}
        <div className="form-group">
          <label className="block text-lg font-medium text-gray-700 mb-2">Brand</label>
          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Stock */}
        <div className="form-group">
          <label className="block text-lg font-medium text-gray-700 mb-2">Stock</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Tags */}
        <div className="form-group">
          <label className="block text-lg font-medium text-gray-700 mb-2">Tags (comma separated)</label>
          <input
            type="text"
            name="tags"
            value={formData.tags.join(",")}
            onChange={handleTagChange}
            className="w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Create;
