const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=3176e28776fd1471658b14bdea899fe8&query=' + latitude + ',' + longitude

    request({ url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service', undefined)
        } else if (response.body.error) {
            callback('Unable to find to location', undefined)
        } else {
            callback(undefined, 'Temperature: '+response.body.current.temperature+'. Wind_speed: '+response.body.current.wind_speed)
        }
    })
}

module.exports = forecast