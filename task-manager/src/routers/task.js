const express = require('express')
const Task = require('../models/task')

const router = new express.Router()

router.get('/task/test', (req, res) => {
    res.send("task test")
})

router.post('/task', async(req, res) => {
    const task = new Task(req.body)
    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
    // task.save().then(() => {
    //     res.status(201).send(task)
    // }).catch((e) => {
    //     console.log("Error =======> 1")
    //     res.status(400).send(e)
    // })
})


router.patch('/task/:id', async(req, res) => {
    console.log("Task update", req.body)
    const updates = Object.keys(req.body)
    const allowedUpdate = ['description', 'complete']
    const isValidOperation = updates.every((update) => {
        return allowedUpdate.includes(update)
    })

    if (!isValidOperation) {
        return res.send("Error: Invalid Update!")
    }

    try {
        const _result = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if (!_result) {
            return res.status(404).send()
        }
        res.send(_result)
    } catch (e) {
        res.status(500).send(e)
    }
})
router.delete('/task/:id', async(req, res) => {
    try {
        const _task = await Task.findByIdAndDelete(req.params.id)
        if (!_task) {
            return res.status(404).send("404")
        }
        res.send(_task)
    } catch (e) {
        res.status(500).send(e)
    }
})
router.get("/task", async(req, res) => {

    try {
        const _task = await Task.find()
        res.send(_task)
    } catch (e) {
        res.status(500).send(e)
    }


    // Task.find({}).then((task) => {
    //     res.send(task)
    // }).catch((e) => {
    //     console.log(e)
    //     res.status(500).send(e)
    // })
})

router.get('/task/:id', async(req, res) => {
    console.log(req.params)
    const _id = req.params.id

    try {
        const _task = await Task.findById(_id)
        if (!_task) {
            return res.status(404).send()
        }
        res.send(_task)
    } catch (e) {
        res.send(e)
    }

    // Task.findById(_id).then((_task) => {
    //     if (!_task) {
    //         return res.status(404).send()
    //     }
    //     res.send(_task)
    // }).catch((e) => {
    //     res.send(e)
    // })
})

module.exports = router