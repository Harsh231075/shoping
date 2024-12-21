const Product = require('../models/product.js');

// Create a new product
const createProduct = async (req, res) => {
  try {
    const { name, description, price, discountPrice, images, category, brand, stock, ratings, reviews, tags } = req.body;

    // Validate required fields
    if (!name || !description || !price || !category || !stock) {
      return res.status(400).json({ message: "Please fill in all required fields." });
    }

    const newProduct = new Product({
      name,
      description,
      price,
      discountPrice,
      images,
      category,
      brand,
      stock,
      ratings,
      reviews,
      tags,
    });

    // Save the new product to the database
    await newProduct.save();
    res.status(201).json({
      message: "Product created successfully!",
      product: newProduct,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "An error occurred while creating the product." });
  }
};

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find(); // Fetch all products from the database
    res.status(200).json({
      message: "Products fetched successfully!",
      products,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "An error occurred while fetching products." });
  }
};

// Get a single product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id); // Fetch the product by ID
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }
    res.status(200).json({
      message: "Product fetched successfully!",
      product,
    });
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "An error occurred while fetching the product." });
  }
};

// Update a product by ID
const updateProduct = async (req, res) => {
  try {
    // Only update the fields provided in the request body
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,  // Only update the fields provided in the request body
      { new: true }  // Return the updated product
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found." });
    }

    res.status(200).json({
      message: "Product updated successfully!",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "An error occurred while updating the product." });
  }
};


// Delete a product by ID
const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id); // Find and delete the product

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found." });
    }

    res.status(200).json({
      message: "Product deleted successfully!",
      product: deletedProduct,
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "An error occurred while deleting the product." });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
