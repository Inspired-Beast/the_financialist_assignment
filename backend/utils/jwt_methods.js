const jwt = require('jsonwebtoken')
require("dotenv").config();

const generateWebToken = (payload) => {
    const options = {
        expiresIn: '1h'
    }
    const token = jwt.sign(payload, process.env.SECRET_KEY, options)
    return token
}

const authenticateCookieToken = (req, res, next) => {
    const authCookie = req.cookies['token'];
    if(authCookie === null){
        return res.sendStatus(401)
    }
    jwt.verify(authCookie, process.env.SECRET_KEY, (err, user) => {
        if(err){
            return res.sendStatus(403)
        }
        req.user = user;
        next()
    })
}

module.exports = {
    generateWebToken, authenticateCookieToken
}
