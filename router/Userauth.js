const express = require('express')
const router = express.Router();

const {login , signup} = require("../controller/user_controller")

// user login
router.post('/login', login)

// user signup
router.post('/signup', signup)

// Admin login
router.post('/adminlogin', )


module.exports = router;