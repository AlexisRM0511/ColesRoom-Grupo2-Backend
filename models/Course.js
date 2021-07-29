const mongoose = require('mongoose')

const coursesSchema = mongoose.Schema({
    name: String,
    category: Boolean,
    user_id: String,
    students: { type: Array, default: [] },
    description: String,
    image: { type: String },   
    datecreate: { type: Date, default: Date.now() },
})

const coursesModel = mongoose.model('courses', coursesSchema)

module.exports = coursesModel