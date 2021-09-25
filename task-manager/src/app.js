const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')


const app = express()

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

module.exports = app