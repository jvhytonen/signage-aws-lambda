const settingsFn = require('./getSettings')
const PT = require('./getPublicTransport');
const getFlights = require('./getFlightItem');
const news = require('./getNews')
const weather = require('./getWeather')
const helpers = require('./helpers')

exports.handler = async (event, callback) => {
    // Hard-coded value of username for test purposes of the AWS API Gateway Query params.
   const settings = await settingsFn.getUserSettings('tester')
   // Data will be stored to data-object.
   const data = {}
   // Getting flight schedules from api 
   const dep = await getFlights.getItem(settings.airport, 'dep');
   const arr = await getFlights.getItem(settings.airport, 'arr');
   // We format flight schedules and strip away all unnecessary information.
   const formattedDepartures = await helpers.formatFlightData(dep.response, 7200, 'departures')
   const formattedArrivals = await helpers.formatFlightData(arr.response, 7200, 'arrivals')
   // If the chosen city is Helsinki. There is a possibility to fetch train shedules to city center. 
   // Settings object has a boolean value for showPublicTransport.
   if (settings.showPublicTransport) {
    const publicTransportData = await PT.fetchTrains();
    const formattedPublicTransport = await helpers.formatPublicTransport(publicTransportData)
    data.publicTransport = formattedPublicTransport
   }
   // Fetch and format news. Settings object has a source for news (BBC, Financial Times etc.)
   const newsItems = await news.fetchNews(settings.newsSource);
   const formattedNews = await helpers.formatNews(newsItems)
   // Fetch and format weather. Settings object has a city or place added ("Helsinki" or "Stockholm" etc.). 
   const weatherRaw = await weather.fetchWeather(settings.weather)
   const formattedWeather = await helpers.formatWeatherData(weatherRaw)
   // Here all data is added to the data-object. Departures and arrivals are merged into a single array.
   data.flights = [...formattedDepartures, ...formattedArrivals]
   data.news = formattedNews
   data.weather = formattedWeather
   data.adsInfo = settings.adsInfo
   // Return data. 
   const response = {
       statusCode: 200,
       body: data
   };
   return response;
};
