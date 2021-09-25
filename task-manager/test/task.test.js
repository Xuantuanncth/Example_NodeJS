const request = require('supertest')
const app = require('../src/app')
const Task = require('../src/models/task')
const {userOne, userOneId, setupDatabase} = require('./fixtures/db')


beforeEach(setupDatabase)

test('Should create task for user', async ()=>{
    const response = await request(app)
        .post('/task')
        .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
        .send({
            description:'Form my test 123'
        })
        .expect(201)
        const task = await Task.findById(response.body._id)
        expect(task).not.toBeNull()
        expect(task.complete).toEqual(false)
})

test('Should fetch user tasks', async ()=>{
    const response = await request(app)
        .get('/tasks')
        .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})