const express = require('express')
const { registerUser, loginUser, userInfo } = require('../controllers/userController')
const { isAuthenticated } = require('../middleware/auth')

const router = express.Router()

router.route('/signup').post(registerUser)
router.route('/signin').post(loginUser)
router.route('/me').get(isAuthenticated, userInfo)

module.exports = router
