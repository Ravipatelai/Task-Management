const jwt = require("jsonwebtoken");

const generateToken = (res, userId) => {
  const token = jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: true, // Always require HTTPS for cross-origin cookies
    sameSite: "none", // Always allow cross-origin
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return token; // 👈 IMPORTANT
};

module.exports = generateToken;