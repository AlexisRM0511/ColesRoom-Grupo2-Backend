
const mongoose = require('mongoose')

const publicationSchema = mongoose.Schema({
    course_id: String,
    type: Int32Array,
    content: String,
    route: { type: Array, default: [] },
})

const usersModel = mongoose.model('publications', usersSchema)

module.exports = usersModel