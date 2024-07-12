const express = require('express')
const URL = require("../models/url")
const router = express.Router()

router.get('/', async (req, res) => {
    const user = req.user;
    const allUrls = await URL.find({ createdBy: user?._id })

    res.render('home', { urls: allUrls })
})
router.get('/signup', (req, res) => {  //localhost:3000/signup
    res.render('signup')
})
router.get('/login', (req, res) => {  //localhost:3000/login
    res.render('login')
})
module.exports = router;