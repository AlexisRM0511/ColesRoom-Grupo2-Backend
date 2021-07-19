const mongoose = require('mongoose')

const coursesSchema = mongoose.Schema({
    name: String,
    category: Boolean,
    user_id: String,
    students: { type: Array, default: [] },
    description: String,
    image: { type: String, default: "../photos/default.png" },   
    datecreate: date,
})

const coursesModel = mongoose.model('courses', coursesSchema)

module.exports = coursesModel