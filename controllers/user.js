const User = require('../models/user')

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
        const user = await User.findOne({ email, password })  //if i put wrong details, login page is rendered w error msg BUT Node app is crashing.
        //fixed by adding "return" keyword before sending response.
        console.log('user', user)
        if (!user) {
            return res.render('login', { isSignedUp: "Wrong email or password." })
        }

        res.redirect('/')
    } catch (error) {
        console.log(error)
        res.render('login', { err: error })
    }



}
module.exports = { createNewUser, loginUser }