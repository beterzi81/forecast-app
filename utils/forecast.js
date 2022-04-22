const axios = require('axios')

const getForecast = async (url) => {
    try {
        return await axios.get(url).then(res => {
            console.log('res.data',res.data);
            return res.data.current
        }).catch(err => console.log(err))
    } catch (err) {
        console.log(err)
    }
}

const forecast = (cords, callback) => {
    const accessKey = process.env.API_ACCESS_KEY;
    const url = `http://api.weatherstack.com/current?access_key=${accessKey}&query=${cords[0]},${cords[1]}&units=m`;
    getForecast(url).then(res => {
        const data = {
            temprature : res.temperature,
            weather_desc : res.weather_descriptions[0],
            feelslike : res.feelslike
        }

        return callback(undefined, data)
    }).catch(err => {
        return callback('hata', undefined)
    })
}

module.exports = forecast