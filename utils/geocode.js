const axios = require('axios')

const getGeocode = async (url) => {
    try {
       return await axios.get(url)
        .then(res => {
            return res.data.features[0].center
        })
        .catch(error => console.log('ERROR =>', error))
    } catch (error) {
        console.log('ERROR =>', error);
    }
}

const geocode = (city, callback) => {
    const apiKey = process.env.API_KEY
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(city)}.json?access_token=${apiKey}`
    
    getGeocode(url).then(cords => {
        if(cords) {
            callback(undefined, cords)
        } else {
            callback('hata',undefined)
        }
    })
}

module.exports = geocode;