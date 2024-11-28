const express = require('express');
const router = express.Router();
const { Signup, Login } = require('../Controllers/AuthController');

// Route for user signup
router.post('/signup', (req, res, next) => {
  console.log("Signup route accessed"); // Optional: For debugging
  Signup(req, res, next);
});

// Route for user login
router.post('/login', (req, res, next) => {
  console.log("Login route accessed"); // Optional: For debugging
  Login(req, res, next);
});

module.exports = router;
