const express = require('express')
const router = express.Router();

const {isUser, isAdmin } = require("../middleware/auth")

const {login , signup, getUser, getUserbyId, Adminlogin, adminSignup} = require("../controller/user_controller")

// user login
router.post('/login', login)

// user signup
router.post('/signup', signup)

// user getDetails
router.get("/get", getUser);

// User details 
router.get("/get/:userId", getUserbyId)

// Admin login
router.post('/Adminlogin', Adminlogin)

// Admin login
router.post('/Adminsignup', adminSignup)

module.exports = router;