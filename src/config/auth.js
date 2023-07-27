const jwt = require('jsonwebtoken')
const config = require('./auth.config')

module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        next()
    } else {
        const token = req.body.token || req.query.token || req.header['authorization']

        if (!token) {
            return res.status(403).send({ errors: ['No token provivded'] })
        }

        jwt.verify(token, config.secret, function (err, decoded) {
            if (err) {
                return res.status(403).send({
                    errors: ['Failed to authenticate token']
                })
            } else {
                req.decoded = decoded
                next()
            }
        })
    }
}