const bcrypt = require("bcryptjs");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");

// Helper function to validate email
const isValidEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// Helper function to validate password (min 6 chars)
const isValidPassword = (password) => password && password.length >= 6;

exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    let errors = [];

    // Validation checks
    if (!name) errors.push("Name is required");
    if (!email) errors.push("Email is required");
    else if (!isValidEmail(email)) errors.push("Email is invalid");

    if (!password) errors.push("Password is required");
    else if (!isValidPassword(password)) errors.push("Password must be at least 6 characters");

    // If there are validation errors, return all together
    if (errors.length > 0) {
      return res.status(400).json({ success: false, errors });
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, errors: ["User already exists"] });
    }

    // Hash password and create user
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Generate token
    const token = generateToken(res, user._id);

    // ✅ Return success message along with data
    res.status(201).json({
      success: true,
      message: "Registration successful",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    let errors = [];

    // 1️⃣ Input validation
    if (!email) errors.push("Email is required");
    else if (!isValidEmail(email)) errors.push("Email is invalid");

    if (!password) errors.push("Password is required");

    // Return all validation errors at once
    if (errors.length > 0) {
      return res.status(400).json({ success: false, errors });
    }

    // 2️⃣ Check if user exists
    const user = await User.findOne({ email });

    // 3️⃣ Compare password
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ success: false, errors: ["Invalid credentials"] });
    }

    // 4️⃣ Generate token
    const token = generateToken(res, user._id);

    // 5️⃣ Successful login response
    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.logout = (req, res) => {
  res.cookie("token", "", { httpOnly: true, expires: new Date(0) });
  res.json({ message: "Logged out" });
};

exports.getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(200).json({
      success: true,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
};