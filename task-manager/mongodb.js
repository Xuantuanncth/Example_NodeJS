// Create read find update delete

//Co the khai bao kieu nay 
// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectId

//hoac la kieu nay
const {MongoClient, ObjectID, Db} = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'


MongoClient.connect(connectionURL,{ useNewUrlParser:true},(error, client)=>{
    if(error) {
        return console.log('Unable to connect to database')
    }
    console.log('Connected correctly')
    const db = client.db(databaseName)

    //inset one data to database
    // db.collection('users').insertOne({
    //     name:'Anh',
    //     age:'25'
    // },(error, result) => {
    //     if(error) {
    //         return console.log('Unable to insert user')
    //     }
    //     console.log(result)
    // })

    //Inset many data to database
    // db.collection('users').insertMany([
    //     {
    //         name:'Thao',
    //         age:15
    //     },
    //     {
    //         name:'Tam',
    //         age:35
    //     }
    // ],(error, result)=> {
    //     if(error){
    //         return console.log('Unable to inset documents')
    //     }
    //     console.log(result)
    // })

    //find one data in database
    // db.collection('users').findOne({_id: new ObjectID("61416050b0ead82f25348a92")},(error,user)=>{
    //     if(error) {
    //         return console.log('Unable to fetch')
    //     }

    //     console.log(user)
    // })    
    //find many data in database
    // db.collection('users').find({name:'Tuan'}).toArray((error, user)=> {
    //     console.log(user)
    // })
    //Counter data in database
    // db.collection('users').find({name:'Tuan'}).count((error, user)=> {
    //     console.log(user)
    // })

    //Update document
    //Delete document with promesis
    db.collection('users').deleteOne({
        name:'Tuan'
    }).then((result) =>{
        console.log(result)
    }).catch((error)=>{
        console.log(error)
    })
})