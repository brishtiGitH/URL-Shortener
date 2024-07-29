const { getUser } = require('../service/authCookie')

const restrictAccess = (req, res, next) => {
    const id = req.cookies?.sessionId;

    if (!id) return res.render('login', {         //LOGIN uses sessionId (stored as a cookie) stored in the client's browser. if the cookie i.e the sessionId is deleted, user need to login again to use the service.
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