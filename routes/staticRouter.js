const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('home')
})
router.get('/signup', (req, res) => {  //localhost:3000/signup
    res.render('signup')
})
router.get('/login', (req, res) => {  //localhost:3000/login
    res.render('login')
})
module.exports = router;