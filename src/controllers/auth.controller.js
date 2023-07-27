const db = require('../models')
const User = db.user
require('dotenv').config()

var jwt = require('jsonwebtoken')
var bcrypt = require('bcrypt')

exports.signup = (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        name: req.body.name,
        role: req.body.role,
        ativo: req.body.ativo,
        password: bcrypt.hashSync(req.body.password, 8)
    }).then(() => {
        res.send({ message: "Usuário cadastrado com sucesso!" })
    })
        .catch(err => {
            res.status(500).send({ message: err.message })
        })
}

exports.signin = (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    })
        .then(user => {
            if (!user) {
                return res.status(404).send({ errors: "Usuário/Senha inválidos!" })
            }

            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            )

            if (!passwordIsValid) {
                return res.status(401).send({
                    token: null,
                    errors: "Usuário/Senha inválidos!"
                })
            }

            var token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
                expiresIn: '365d'
            })

            res.json({
                id : user.id,
                username: user.username,
                name: user.name,
                email: user.email,
                status: user.status,
                ativo: user.ativo,
                token: token
            })
        })
        .catch(
            err => {
                res.status(500).send({ errors: err.message })
            }
        )
}