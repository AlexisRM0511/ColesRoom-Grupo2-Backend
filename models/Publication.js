
const mongoose = require('mongoose')

const publicationSchema = mongoose.Schema({
    course_id: String,
    type: Number,
    content: String,
    route: { type: Array, default: [] },
})

const publicationModel = mongoose.model('publications', publicationSchema)

module.exports = publicationModel