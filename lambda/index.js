const PT = require('./getPublicTransport');
const getFlights = require('./getFlightItem');
const news = require('./getNews')
const weather = require('./getWeather')
const helpers = require('./helpers')

// Hard coded settings that can later be saved to a database or similar. 
// So that this App can be used even with other options (another airport, news Source etc.)
const settings = {
  url: 'https://airlabs.co/api/v9/schedules',
  airport: 'HEL',
  newsSource: 'bbc'
}

exports.handler = async (event, callback) => {
    
   const dep = await getFlights.getItem(settings, 'dep');
   const arr = await getFlights.getItem(settings, 'arr');
   const formattedDepartures = await helpers.formatFlightData(dep.response, 7200, 'departures')
   const formattedArrivals = await helpers.formatFlightData(arr.response, 7200, 'arrivals')
   const publicTransportData = await PT.fetchTrains();
   const formattedPublicTransport = await helpers.formatPublicTransport(publicTransportData)
   const newsItems = await news.fetchNews(settings.newsSource);
   const formattedNews = await helpers.formatNews(newsItems)
   const weatherRaw = await weather.fetchWeather()
   const formattedWeather = await helpers.formatWeatherData(weatherRaw)
   const data = {
       flights: [...formattedDepartures, ...formattedArrivals],
       news: formattedNews,
       publicTransport: formattedPublicTransport,
       weather: formattedWeather
   };
   const response = {
       statusCode: 200,
       body: data
   };
   return response;
};
