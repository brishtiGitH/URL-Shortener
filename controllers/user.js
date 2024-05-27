const User = require('../models/user')

const createNewUser = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.render('signup', {
            error: 'All fields are required.'
        })
    }
    await User.create({
        name,
        email,
        password
    })
    res.redirect('/')
}
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password })  //if i put wrong details, login page is rendered w error msg BUT Node app is crashing.
    console.log('user', user)
    if (!user) {
        res.render('login', { isSignedUp: "Wrong email or password." })
    }
    res.redirect('/')
}
module.exports = { createNewUser, loginUser }