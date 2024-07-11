const { getUser } = require('../service/authCookie')


const restrictAccess = (req, res, next) => {
    const id = req.cookies?.sessionId;
    if (!id) return res.render('login', {
        isLoggedIn: false
    })
    const user = getUser(id);
    if (!user) return res.redirect('/login')

    next()

}

module.exports = { restrictAccess };