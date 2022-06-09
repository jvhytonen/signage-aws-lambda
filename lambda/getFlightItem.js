const fetch = require('node-fetch');
const apikey = require('./keys');

const getItem = async (settings, flightType) => {
    let apiUrl = `${settings.url}?${flightType}_iata=${settings.airport}&api_key=${apikey.flightApiKey}`;
    try {
        const response = await fetch(apiUrl);
        return response.json();
    }
    catch(err){
        console.log(err)
    }
  }

module.exports = {
    getItem
}