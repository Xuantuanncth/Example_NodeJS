const express = require('express')
const User = require('../models/user')

const router = new express.Router()

router.get('/test', (req, res) => {
    res.send("This test router")
})

router.get("/users", async(req, res) => {

    try {
        const result = await User.find({})
        res.send(result)

    } catch (e) {
        res.status(500).send(e)
    }

    // Old code
    // User.find({}).then((users) => {
    //     res.send(users)
    // }).catch((e) => {
    //     console.log(e)
    //     res.status(500).send(e)
    // })
})

router.get('/users/:id', async(req, res) => {
    console.log(req.params)
    const _id = req.params.id

    try {
        const users = await User.findById(_id).exec()
        if (!users) {
            return res.status(404).send()
        }
        return res.send(users)
    } catch (e) {
        return res.status(500).send(e)
    }

    /******* OLD code ********/
    // User.findById(_id).then((user) => {
    //     if (!user) {
    //         return res.status(404).send()
    //     }
    //     res.send(user)
    // }).catch((e) => {
    //     res.send(e)
    // })
})

//Using findByIdAnhUpdate
router.patch('/users/:id', async(req, res) => {
    console.log("findByIdAnhUpdate: ", req.body)

    /**Find req.boy invalid in database */
    const updates = Object.keys(req.body)
    console.log(updates)
    const allowedUpdate = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => {
        return allowedUpdate.includes(update)
    })

    if (!isValidOperation) {
        return res.status(400).send('Error: Invalid updates')
    }
    try {
        //const _user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        const _user = await User.findById(req.params.id)
        updates.forEach((result) => {
            _user[result] = req.body[result]
        })
        await _user.save()
        res.status(201).send(_user)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/users/:id', async(req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if (!user) {
            return res.status(404).send("404")
        }
        res.send(user)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.post('/users', async(req, res) => {
    console.log(req.body)
    const user = new User(req.body)

    try {
        await user.save()
        res.status(201).send(user)
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
    console.log('Body: ', req.body);
    try {
        const _user = await User.findByCredentials(req.body.email, req.body.password)
        res.send(_user)
    } catch (e) {
        res.status(400).send()
    }
})

module.exports = router