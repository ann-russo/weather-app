const request = require('postman-request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYXVydXNvdmEiLCJhIjoiY2w1dmJrem1mMDI4djNjbnp5ZnVvOWpqeiJ9.98C1LrrF7jYpHWgXeKgOww&limit=1'

    request({url, json: true}, (error, {body}) => {

        if (error) {
            callback('Unable to connect to location services', undefined)

        } else if (body.features.length === 0) {
            callback('Location not found! Try again with a new location.', undefined)

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