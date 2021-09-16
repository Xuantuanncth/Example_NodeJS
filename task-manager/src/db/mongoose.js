const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a number')
            }
        }
    },
    email: {
        type: String,
        require: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        require: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password can not contain "password"')
            }
        }

    }
})

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

const User = mongoose.model('users', userSchema)
const Task = mongoose.model('task', taskSchema)

const product1 = new Task({
    description: '   Product 123  '
})

const me = new User({
    name: 'Do Xuan Tuan',
    email: 'TUANDX2@GMAIL.COM',
    age: 18,
    password: '123123123'
})

// me.save().then(() => {
//     console.log(me)
// }).catch((error) => {
//     console.log(error)
// })

product1.save().then(() => {
    console.log(product1)
}).catch((error) => {
    console.log(error)
})