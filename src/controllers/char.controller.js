const db = require('../models')
const Char = db.Char

exports.findAll = async (req,res) => {
    const data = await Char.findAll()
    res.json(data)
}