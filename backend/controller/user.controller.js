const bcrypt = require('bcryptjs'); // Import bcrypt to hash passwords
const jwt = require('jsonwebtoken');
const User = require('../models/User.js'); // Import User model

const createUser = async (req, res) => {
  try {
    const data = req.body;
    // Check if data exists
    if (!data || !data.name || !data.email || !data.password || !data.role || !data.imageUrl) {
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
      photo: data.imageUrl
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
    const { email, password, role } = req.body;

    // Check if email and password are provided
    if (!email || !password || !role) {
      return res.status(400).json({ message: "Please provide both email and password." });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User with this email does not exist." });
    }

    if (user.role !== role) {
      return res.status(400).json({ message: "Given role is not defined with the email." });
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
      userId: user._id,
      role: user.role,
      photo: user.photo
    });

  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "An error occurred while logging in." });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "An error occurred while fetching the user." });
  }
};

const editUserData = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10); // Hash new password
    }

    const updatedUser = await User.findByIdAndUpdate(id, updates, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found or update failed." });
    }

    res.status(200).json({ message: "User updated successfully.", updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "An error occurred while updating the user." });
  }
};

module.exports = { createUser, loginUser, getUserById, editUserData }; // Export the function for use in routes
