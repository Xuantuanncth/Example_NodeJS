const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT || 3000
app.use(express.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.get("",(req, res)=>{
    res.send("App on")
})

app.post('/users', (req, res)=>{
    console.log(req.body)
    res.send("Testing")
})

app.listen(port,()=>{
    console.log('Server start in port ',port)
})