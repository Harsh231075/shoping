const express = require('express');
const { createUser, loginUser, getUserById, editUserData } = require('../controller/user.controller.js')
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require('../controller/product.controller.js');


const router = express.Router();

// Route for creating a new user
router.post('/user', createUser);

router.post('/login', loginUser);

router.get('/user/:id', getUserById); // Get user by ID

router.put('/update/:id', editUserData); // Edit user data

// Route for creating a new product
router.post('/product', createProduct);

// Route for getting all products
router.get('/products', getAllProducts);

// Route for getting a product by ID
router.get('/product/:id', getProductById);

// Route for updating a product by ID
router.put('/product/:id', updateProduct);

// Route for deleting a product by ID
router.delete('/product/:id', deleteProduct);

module.exports = router;
