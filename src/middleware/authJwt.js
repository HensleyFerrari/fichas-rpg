const jwt = require('jsonwebtoken')

verifyToken = (req, res, next) => {
    const token = req.body.token || ''
    jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
        return res.status(200).send({ valid: !err })
    })
}

const authJwt = {
    verifyToken: verifyToken
}

module.exports = authJwt