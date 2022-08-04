const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=f515ba25e007d353b8529d2cbf7fcc55&query=' + latitude + ',' + longitude + '&units=m'

    request({url, json: true}, (error, {body}) => {

        if (error) {
            callback('Unable to connect to weather service!', undefined)

        } else if (body.error) {
            callback('Unable to find location', undefined)

        } else {
            callback(
                undefined,
                body.current.weather_descriptions[0] +
                '. It is currently ' + body.current.temperature +
                '°C out, and feels like ' + body.current.feelslike + '°C.' +
                ' Current humidity is at ' + body.current.humidity + '%.')
        }
    })
}

module.exports = forecast