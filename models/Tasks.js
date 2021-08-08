
const mongoose = require('mongoose')

const tasksSchema = mongoose.Schema({
    user_id: String,
    publication_id: String,
})

const tasksModel = mongoose.model('tasks', tasksSchema)

module.exports = tasksModel