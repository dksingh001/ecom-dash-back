const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/user_model");

// auth
exports.auth = async (req, resp, next) => {
  try {
    // extraction token
    const token =
      req.cookies.token ||
      req.body.token ||
      req.header("Authorization").replace("authuser", "");

    // if token is missing, then return response
    if (!token) {
      return resp.status(401).json({
        success: false,
        message: "token is missing",
      });
    }

    // verify the token
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
      console.log("deocde", decode);
      req.user = decode;
    } catch (error) {
      console.log("error in auth middleware", error);
      resp.status(401).json({
        success: false,
        message: "somthing went to wrong while validating to token",
      });
    }
  } catch (error) {
    console.log(error);
    resp.status(401).json({
      success: false,
      message: "somthing went to wrong while validating to token",
    });
  }
};

exports.isauth = async (req, resp, next) => {
  try {
    const { token } = req.params;

    console.log("token", token);

    // if token is missing, then return response
    if (!token) {
      return resp.status(401).json({
        success: false,
        message: "token is missing",
      });
    }
    // verify the token
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
      console.log("deocde", decode);
      req.user = decode;
    } catch (error) {
      console.log("error in auth middleware", error);
      resp.status(401).json({
        success: false,
        message: "somthing went to wrong while validating to token",
      });
    }
  } catch (error) {
    resp.status(401).json({
      success: false,
      message: "somthing went to wrong while validating to token",
    });
  }
};

// isUser
exports.isUser = async (req, resp, next) =>{
    try {
        if (req.user.role !=="User") {
            return resp.status(401).json({
                success:false,
                message:"This is protected route for user only"
            })
        }
        next();
    } catch (error) {
        resp.status(500).json({
            success:false,
            message:"user role con't be verified, please try again"
        })
    }
}

// admin 
exports.isAdmin = async (req, resp, next) =>{
    try {
        if (req.user.role !=="Admin") {
            return resp.status(401).json({
                success:false,
                message:"This is protected route for user only"
            })
        }
        next();
    } catch (error) {
        resp.status(500).json({
            success:false,
            message:"user role con't be verified, please try again"
        })
    }
}