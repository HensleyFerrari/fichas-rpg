const controller = require('../controllers/char.controller')

module.exports = app => {
    app.get('/api/chars', controller.findAll)
}