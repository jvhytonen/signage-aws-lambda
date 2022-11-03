const fetch = require('node-fetch');
const apiKey = require('./keys');

export const fetchWeather = async (source) => {
   let apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${source}/next24hours?unitGroup=metric&key=${apiKey.weatherApiKey}&contentType=json`
    try {
        const response = await fetch(apiUrl);
        return response.json()
    }
    catch(err){
        console.log(err)
    }
  }

module.exports = {
    fetchWeather
}