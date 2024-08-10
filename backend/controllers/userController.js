import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Helper function to generate a JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// Register a new user
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the user's password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user instance
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await user.save();

    // Generate a JWT token for the user
    const token = generateToken(user._id);

    // Send the user data and token in the response
    res.status(201).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.error(`Error registering user: ${error.message}`);
    res.status(500).json({ message: 'Server error' });
  }
};

// Login a user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token for the user
    const token = generateToken(user._id);

    // Send the user data and token in the response
    res.status(200).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.error(`Error logging in user: ${error.message}`);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get user profile
export const getUserProfile = async (req, res) => {
  try {
    // Find the user by ID and exclude the password from the response
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error(`Error fetching user profile: ${error.message}`);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update user profile
export const updateUserProfile = async (req, res) => {
  const { name, email, password, goals, calories } = req.body;

  try {
    // Find the user by ID
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user details if provided
    user.name = name || user.name;
    user.email = email || user.email;
    user.goals = goals || user.goals;
    user.calories = calories || user.calories;

    // Hash the new password if it's provided
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    // Save the updated user to the database
    const updatedUser = await user.save();

    // Generate a new JWT token
    const token = generateToken(updatedUser._id);

    // Send the updated user data and token in the response
    res.json({
      user: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        goals: updatedUser.goals,
        calories: updatedUser.calories,
      },
      token,
    });
  } catch (error) {
    console.error(`Error updating user profile: ${error.message}`);
    res.status(500).json({ message: 'Server error' });
  }
};
