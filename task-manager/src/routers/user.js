const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const multer = require('multer')
const sharp = require('sharp')


const router = new express.Router()

router.get("/users/me",auth, async(req, res) => {

    res.send(req.user)
    // try {
    //     const result = await User.find({})
    //     res.send(result)

    // } catch (e) {
    //     res.status(500).send(e)
    // }

    // Old code
    // User.find({}).then((users) => {
    //     res.send(users)
    // }).catch((e) => {
    //     console.log(e)
    //     res.status(500).send(e)
    // })
})

// router.get('/users/:id', async(req, res) => {
//     console.log(req.params)
//     const _id = req.params.id

//     try {
//         const users = await User.findById(_id).exec()
//         if (!users) {
//             return res.status(404).send()
//         }
//         return res.send(users)
//     } catch (e) {
//         return res.status(500).send(e)
//     }

//     /******* OLD code ********/
//     // User.findById(_id).then((user) => {
//     //     if (!user) {
//     //         return res.status(404).send()
//     //     }
//     //     res.send(user)
//     // }).catch((e) => {
//     //     res.send(e)
//     // })
// })

//Using findByIdAnhUpdate
router.patch('/users/me',auth, async(req, res) => {
    console.log("findByIdAnhUpdate 1: ", req.body)

    /**Find req.boy invalid in database */
    const updates = Object.keys(req.body)
    const allowedUpdate = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => {
        return allowedUpdate.includes(update)
    })

    if (!isValidOperation) {
        return res.status(400).send('Error: Invalid updates')
    }
    try {
        //const _user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        updates.forEach((result) => {
            req.user[result] = req.body[result]
        })
        await req.user.save()
        res.status(201).send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/users/me', auth, async(req, res) => {
    try {
        // const user = await User.findByIdAndDelete(req.user._id)
        // if (!user) {
        //     return res.status(404).send("404")
        // }

        await req.user.remove()
        res.send(req.user)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.post('/users', async(req, res) => {
    console.log(req.body)
    const user = new User(req.body)

    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({user, token})
    } catch (e) {
        res.status(400).send(e)
    }

    // Old code
    // user.save().then(() => {
    //     res.send(user)
    // }).catch((e) => {
    //     console.log(e)
    //     res.status(400).send(e)
    // })
})

router.post('/users/login', async(req, res) => {
    console.log('Login: ', req.body);
    try {
        const _user = await User.findByCredentials(req.body.email, req.body.password)   
        const token = await _user.generateAuthToken()
        res.send({_user, token})
    } catch (e) {
        res.status(400).send()
    }
})

router.post('/users/logout', auth, async(req, res)=>{
    try{
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    }catch(e){
        res.status(500).send()
    }
})

router.post('/users/logoutAll', auth, async(req, res)=>{
    try{
        req.user.tokens =[]
        await req.user.save()
        res.send()
    }catch(e){
        res.status(500).send()
    }
})

const upload = multer({
    limits:{
        fileSize:100000
    },
    fileFilter(req, file, cb){

        if(!file.originalname.match(/\.(img|jpg|png)$/)){
            return cb(new Error('Please upload a Img'))
        }

        // cb(new Error('File must be a PDF'))
        cb(undefined, true)
        // cb(undefined,false)
    }
})



router.post('/users/me/avatar',auth,upload.single('avatar'), async (req, res)=>{
    const buffer = await sharp(req.file.buffer).resize({width:250, height:250}).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    res.send("Upload avatar done")
},(error,req,res,next)=>{
    res.status(400).send({error:error.message})
})

router.delete('/users/me/avatar', auth, async(req, res) => {
    
    try {
        req.user.avatar = undefined
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/users/:id/avatar', async (req, res) =>{
    try{
        const user = await User.findById(req.params.id)

        if(!user || !user.avatar){
            throw new Error()
        }
        res.set('Content-Type','image/png')
        res.send(user.avatar)
    } catch(e) {
        res.status(404).send()
    }
})

module.exports = router