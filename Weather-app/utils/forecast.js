const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=3176e28776fd1471658b14bdea899fe8&query=' + latitude + ',' + longitude

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service', undefined)
        } else if (body.error) {
            callback('Unable to find to location', undefined)
        } else {
            callback(undefined, body.current.temperature)
        }
    })
}

module.exports = forecast