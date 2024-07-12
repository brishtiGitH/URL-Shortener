const User = require('../models/user')
const { v4: uuidv4 } = require('uuid');
const { setUser, getUser } = require('../service/authCookie')

const createNewUser = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.render('signup', {
            error: 'All fields are required.'
        })
    }
    await User.create({
        name,
        email,
        password
    })
    return res.redirect('/')
}
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email, password })
        console.log('user', user)
        if (!user) {
            return res.render('login', { isSignedUp: "Wrong email or password." })
        }
        const uid = uuidv4();
        setUser(uid, user);

        res.cookie("sessionId", uid)  //store id as a cookie

        res.redirect('/')
    } catch (error) {
        console.log(error)
        res.render('login', { err: error })
    }



}
module.exports = { createNewUser, loginUser }