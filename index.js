const express = require('express')
require('dotenv').config()
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
app.use(express.json())

const port = process.env.PORT || 8080

app.get('/', (_req, res) => {
    res.send("osman")
})

app.get('/weather/:city', (req, res) => {
    const city = req.params.city;

    geocode(city, (err, data) => {
        if(!err) {
            forecast(data, (err, info) => {
                if(!err) {
                    res.send(info)
                } else {
                    console.log(err);
                }
            })
            // res.send(data)
        } else {
            console.log(err)
        }
    })
})

app.listen(port, () => {
    console.log(`Application running port on ${port}`)
})