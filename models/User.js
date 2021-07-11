
const mongoose = require('mongoose')

const usersSchema = mongoose.Schema({
    email: String,
    name: String,
    password: String
})

const usersModel = mongoose.model('users', usersSchema)

module.exports = usersModel