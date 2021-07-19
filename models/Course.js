const mongoose = require('mongoose')

const coursesSchema = mongoose.Schema({
    name: String,
    category: Boolean,
    user_id: String,
    students: { type: Array, default: [] },
    description: String,
    image: { type: String, default: "../photos/Fondo.jpg" },   
    datecreate: { type: Date, default: "2021-12-31T05:13:05.100+00:00" },
})

const coursesModel = mongoose.model('courses', coursesSchema)

module.exports = coursesModel