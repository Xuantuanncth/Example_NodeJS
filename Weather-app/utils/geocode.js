const request = require('request')

const geocode = function(address, callback) {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoieHVhbnR1YW5uY3RoIiwiYSI6ImNrdGY2MHh4ajA1MDIydm5sOTE0aDk1dW8ifQ.15niDAgeKOq0eOm_Fod5lg'
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location service', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find to location. Try another search', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode