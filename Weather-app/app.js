const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(process.argv)

const address = process.argv[2]
console.log(address)
if (!address) {
    console.log('Please provide an address')
} else {
    geocode(address, (error,response) => { /// { latitude, longitude, location }
        if (error) {
            return console.log('Error: ', error)
        }
        console.log(response)
        // forecast(latitude, longitude, (error, forecastData) => {
        //     if (error) {
        //         return console.log(error)
        //     }
        //     console.log('Location: ', location)
        //     console.log("Temperature: ", forecastData)
        // })
    })
}