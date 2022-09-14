const PT = require('./getPublicTransport');
const getFlights = require('./getFlightItem');
const news = require('./getNews')
const helpers = require('./helpers')
const weather = require('./getWeather')

// Hardcoded settings that can later be for example fetched from database or json file if the user wants to change the airport or the news source
const settings = {
  url: 'https://airlabs.co/api/v9/schedules',
  airport: 'HEL',
  newsSource: 'bbc',
}

exports.handler = async (event, callback) => {
    
   const dep = await getFlights.getItem(settings, 'dep');
   const arr = await getFlights.getItem(settings, 'arr');
   const formattedDepartures = await helpers.formatData(dep.response, 7200, 'departures')
   const formattedArrivals = await helpers.formatData(arr.response, 7200, 'arrivals')
   const trainItems = await PT.fetchTrains();
   const newsItems = await news.fetchNews(settings.newsSource);
   const weatherItems = await weather.fetchWeather()
   const data = {
       flights: [...formattedDepartures, ...formattedArrivals],
       news: newsItems,
       trains: trainItems,
       weather: weatherItems
   };
   const response = {
       statusCode: 200,
       body: data
   };
    return response;
};
