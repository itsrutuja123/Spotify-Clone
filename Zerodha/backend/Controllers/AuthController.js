const User = require('../model/UserModel');
const bcrypt = require('bcrypt');
const { createSecretToken } = require('../util/SecretToken');

// Signup function
const Signup = async (req, res) => {
  const { username, email, password } = req.body;

  // Check if all required fields are provided
  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        message: "User already exists. Please login instead.", 
        loginOption: true 
      });
    }

    // Hash the password before saving it
    const salt = await bcrypt.genSalt(10); // Generate salt
    const hashedPassword = await bcrypt.hash(password, salt); // Hash password

    // Create the new user with hashed password
    const newUser = new User({ username, email, password: hashedPassword });

    // Save user to DB
    await newUser.save();

    // Generate a token
    const token = createSecretToken(newUser._id);

    // Send token in a secure cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',  // Secure cookie in production
      maxAge: 3 * 24 * 60 * 60 * 1000,  // Token expiration time (3 days)
    });

    res.status(201).json({ message: "User signed up successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Error signing up user", error: error.message });
  }
};

// Login function
const Login = async (req, res) => {
  const { email, password } = req.body;

  // Check if all required fields are provided
  if (!email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ 
        message: 'User not found. Please signup first.', 
        signupOption: true 
      });
    }

    // Compare the entered password with the stored hashed password
    const auth = await bcrypt.compare(password, user.password);

    // If passwords do not match
    if (!auth) {
      return res.status(400).json({ message: 'Incorrect email or password' });
    }

    // Generate a token
    const token = createSecretToken(user._id);

    // Send token in a secure cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',  // Secure cookie in production
      maxAge: 3 * 24 * 60 * 60 * 1000,  // Token expiration time (3 days)
    });

    // Return success message
    res.status(200).json({ message: 'User logged in successfully' });
  } catch (error) {
    console.error("Login error: ", error);  // Log the error for debugging
    res.status(500).json({ message: 'Error logging in user', error: error.message });
  }
};

module.exports = { Signup, Login };
