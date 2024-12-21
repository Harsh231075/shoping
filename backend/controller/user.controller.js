const bcrypt = require('bcryptjs'); // Import bcrypt to hash passwords
const jwt = require('jsonwebtoken');
const User = require('../models/User.js'); // Import User model

const createUser = async (req, res) => {
  try {
    const data = req.body;
    // Check if data exists
    if (!data || !data.name || !data.email || !data.password || !data.role) {
      return res.status(400).json({ message: "Please provide all required fields (name, email, password, role)." });
    }

    // Check if user with the given email already exists
    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
      return res.status(400).json({ message: "User with this email already exists." });

    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(data.password, 10); // 10 is the salt rounds

    // Create a new user instance
    const newUser = new User({
      name: data.name,
      email: data.email,
      password: hashedPassword, // Store the hashed password
      role: data.role,
    });

    // Save the user to the database
    await newUser.save();

    // Respond with the saved user
    res.status(201).json({ message: "Signup Successfuly", newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "An error occurred while creating the user." });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({ message: "Please provide both email and password." });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User with this email does not exist." });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password." });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role }, // Payload with user info (you can add more fields here)
      process.env.JWT_SECRET,  // Secret key (should be in your environment variables)
      { expiresIn: '7d' } // Token expiration time (1 hour in this example)
    );
    console.log(token);
    // Respond with the token
    res.status(200).json({
      message: 'Login successful!',
      token: token,
      userId: user._id
    });

  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "An error occurred while logging in." });
  }
};

module.exports = { createUser, loginUser }; // Export the function for use in routes
