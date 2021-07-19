const mongoose = require('mongoose')

const usersSchema = mongoose.Schema({
    name: String,
    surname: String,
    phone: { type: String, default: "000-000-000" },
    email: String,
    password: String,
    coursecreated: { type: Array, default: [] },
    mycourses: { type: Array, default: [] },
    photo: { type: String, default: "../photos/default.png" },    
})

const usersModel = mongoose.model('users', usersSchema)

module.exports = usersModel