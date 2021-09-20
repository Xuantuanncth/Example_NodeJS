const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        require: true,
        trim: true
    },
    complete: {
        type: Boolean,
        default: false
    }
})

const Task = mongoose.model('task', taskSchema)

module.exports = Task