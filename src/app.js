const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for express configuration
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Set up handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Set up static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Anastasia Urusova'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide a location!'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({
                error: error
            })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error: error
                })
            }
            res.send({
                address: req.query.address,
                location: location,
                forecast: forecastData
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search);
    res.send({
        products: []
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Anastasia Urusova'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'This is a helpful text',
        name: 'Anastasia Urusova'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404-page', {
        title: '404',
        name: 'Anastasia Urusova',
        error: 'Help article not found!'
    })
})

app.get('*', (req, res) => {
    res.render('404-page', {
        title: '404',
        name: 'Anastasia Urusova',
        error: 'Page not found!'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
