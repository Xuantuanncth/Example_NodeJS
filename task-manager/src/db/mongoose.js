const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api')

const userSchema = new mongoose.Schema({
    name: {
        type:String,
        require:true
    },
    age:{
        type:Number
    }
})

const taskSchema = new mongoose.Schema({
    descreption: {
        type:String,
        require:true
    },
    complete:{
        type:Boolean
    }
})

const User = mongoose.model('users',userSchema)
const Task = mongoose.model('task',taskSchema)

const product1 = new Task({
    descreption:"Product 1 progess 80%",
    complete:false
})

const me = new User({
    name: 'TuanDX2',
    age:25
})

product1.save().then(()=>{
    console.log(product1)
}).catch((error)=>{
    console.log(error)
})