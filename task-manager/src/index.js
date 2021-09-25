const app = require('./app')

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log('Server start in port ', port)
})

// const upload = multer({
//     dest:'images',
//     limits:{
//         fileSize:100000
//     },
//     fileFilter(req, file, cb){

//         if(!file.originalname.match(/\.(jpg|docx)$/)){
//             return cb(new Error('Please upload a PDF'))
//         }

//         // cb(new Error('File must be a PDF'))
//         cb(undefined, true)
//         // cb(undefined,false)
//     }
// })

// const errorMiddleware = (req, res, next) =>{
//     throw new Error('From middleware')
// }

// app.post('/upload',upload.single('upload'),(req, res)=>{
//     res.send()
// },(error, req, res, netx)=>{
//     res.status(400).send({error:error.message})
// })

// const jwt = require('jsonwebtoken')

// const myFun = async() => {
//     const password = "123456789"
//     const hasPassword = await bcrypt.hash(password, 8)

//     console.log(password)
//     console.log(hasPassword)

//     const isMatch = await bcrypt.compare('12346789', hasPassword)
//     console.log(isMatch)
// }
// const myFun = async() => {
//     const _token = jwt.sign({ _id: '1234a' }, 'thisismynewcourse', { expiresIn: '1 minute' })
//     console.log(_token)

//     const data = jwt.verify(_token, 'thisismynewcourse')
//     console.log(data)

// }

// myFun()

// const main = async ()=>{
//     // const task = await Task.findById('61483d14db2fbaaa0aadadeb')
//     // await task.populate('owner').execPopulate()
//     // console.log(task.owner)

//     const user = await User.findById('61497e8ab18881b4f10cfd41')
//     console.log(user)
//     await user.populate('tasks')
//     console.log(user.tasks)
// }

// main()