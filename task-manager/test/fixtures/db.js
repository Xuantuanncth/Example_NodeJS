const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = require('../../src/models/user')
const Task = require('../../src/models/task')


const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id:userOneId,
    name:'Mike',
    email:'tuan@example.com',
    password:'123123123',
    tokens:[{
        token:jwt.sign({_id:userOneId},"thisismynewcaurse")
    }]
}

const userTwoId = new mongoose.Types.ObjectId()
const userTwo = {
    _id:userTwoId,
    name:'TuanDXDZ',
    email:'tuanxxx123@example.com',
    password:'zzz111222',
    tokens:[{
        token:jwt.sign({_id:userTwoId},"thisismynewcaurse")
    }]
}


const taskOne = {
    _id: new mongoose.Types.ObjectId(),
    description:"Many time tesst",
    complete:true,
    owner:userOne._id
}

const taskTwo = {
    _id: new mongoose.Types.ObjectId(),
    description:"Second time",
    complete:true,
    owner:userOne._id
}


const taskThree = {
    _id: new mongoose.Types.ObjectId(),
    description:"Third time",
    complete:true,
    owner:userTwo._id
}

const setupDatabase = async() =>{
    await User.deleteMany()
    await Task.deleteMany()
    await new User(userOne).save()
    await new User(userTwo).save()
    await new Task(taskOne).save()
    await new Task(taskTwo).save()
    await new Task(taskThree).save()
}

module.exports = {
    userOneId,
    userOne,
    setupDatabase
}