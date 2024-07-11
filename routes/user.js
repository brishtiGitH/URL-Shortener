const express = require('express')
const router = express.Router()
const { createNewUser, loginUser } = require('../controllers/user')

router.post('/signup', createNewUser) //localhost:3000/user/signup
router.post('/login', loginUser)  //localhost:3000/user/login
module.exports = router;