const { getUser } = require('../service/authCookie')

const restrictAccess = (req, res, next) => {
    const id = req.cookies?.sessionId;
    if (!id) return res.render('login', {
        isLoggedIn: false
    })
    const user = getUser(id);
    if (!user) return res.redirect('/login')

    req.user = user;
    next()

}
const checkAuth = (req, res, next) => {
    const id = req.cookies?.sessionId;
    const user = getUser(id);
    req.user = user;
    next()

}
module.exports = { restrictAccess, checkAuth };