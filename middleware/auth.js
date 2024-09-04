const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/user_model");

// Authentication Middleware
exports.auth = async (req, resp, next) => {
  try {
    // Extract token from cookies, body, or headers
    const token =
      req.cookies.token ||
      req.body.token ||
      req.header("Authorization")?.replace("Bearer"," "); // Ensure there's a space after "Bearer"

    // If token is missing, return a response
    if (!token) {
      return resp.status(401).json({
        success: false,
        message: "Token is missing",
      });
    }

    // Verify the token
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
      console.log("Decoded", decode);
      req.user = decode;
      next();
    } catch (error) {
      console.log("Error in auth middleware", error);
      return resp.status(401).json({
        success: false,
        message: "Invalid or expired token",
      });
    }
  } catch (error) {
    console.log("Error in auth middleware", error);
    return resp.status(500).json({
      success: false,
      message: "Something went wrong while validating the token",
    });
  }
};

// Token Verification Middleware (Optional)
exports.isauth = async (req, resp, next) => {
  try {
    const { token } = req.params;

    console.log("Token", token);

    // If token is missing, return a response
    if (!token) {
      return resp.status(401).json({
        success: false,
        message: "Token is missing",
      });
    }

    // Verify the token
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
      console.log("Decoded", decode);
      req.user = decode;
      next(); // Don't forget to call next() to proceed to the next middleware or route
    } catch (error) {
      console.log("Error in isauth middleware", error);
      return resp.status(401).json({
        success: false,
        message: "Invalid or expired token",
      });
    }
  } catch (error) {
    console.log("Error in isauth middleware", error);
    return resp.status(500).json({
      success: false,
      message: "Something went wrong while validating the token",
    });
  }
};

// User Role Middleware
exports.isUser = async (req, resp, next) => {
  try {
    if (req.user.role !== "User") {
      return resp.status(403).json({
        success: false,
        message: "Access denied. This route is protected for users only.",
      });
    }
    next();
  } catch (error) {
    console.log("Error in isUser middleware", error);
    return resp.status(500).json({
      success: false,
      message: "User role can't be verified. Please try again.",
    });
  }
};

// Admin Role Middleware
exports.isAdmin = async (req, resp, next) => {
  try {
    if (req.user.role !== "Admin") {
      return resp.status(403).json({
        success: false,
        message: "Access denied. This route is protected for admins only.",
      });
    }
    next();
  } catch (error) {
    console.log("Error in isAdmin middleware", error);
    return resp.status(500).json({
      success: false,
      message: "User role can't be verified. Please try again.",
    });
  }
};
