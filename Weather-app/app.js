const request = require('request')

const url = 'http://api.weatherstack.com/current?access_key=3176e28776fd1471658b14bdea899fe8&query=15.9803926,108.2733412'

request({ url: url, json: true }, (error, response) => {
    // console.log(response.body.current.temperature)
})

//1. Print: It is currently temperature out