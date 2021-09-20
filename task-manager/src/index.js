const express = require('express')
const Task = require('./models/task')
require('./db/mongoose')
const User = require('./models/user')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const bcrypt = require('bcryptjs')


const app = express()
const port = process.env.PORT || 3000
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.listen(port, () => {
    console.log('Server start in port ', port)
})

const jwt = require('jsonwebtoken')

// const myFun = async() => {
//     const password = "123456789"
//     const hasPassword = await bcrypt.hash(password, 8)

//     console.log(password)
//     console.log(hasPassword)

//     const isMatch = await bcrypt.compare('12346789', hasPassword)
//     console.log(isMatch)
// }
const myFun = async() => {
    const _token = jwt.sign({ _id: '1234a' }, 'thisismynewcourse', { expiresIn: '1 minute' })
    console.log(_token)

    const data = jwt.verify(_token, 'thisismynewcourse')
    console.log(data)

}

myFun()