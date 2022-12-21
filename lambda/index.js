const settingsFn = require('./getSettings')
const PT = require('./getPublicTransport');
const getFlights = require('./getFlightItem');
const news = require('./getNews')
const weather = require('./getWeather')
const miscHelpers = require('./misc-helpers')
const flightDataHelpers = require('./flight-data-helpers')

exports.handler = async (event, callback) => {
   const settings = await settingsFn.getUserSettings(event.user)
   if (settings === undefined) {
       const response = {
           statusCode: 404,
           body: 'Error! No user found'
       }
       return response
   }
   // Data will be stored to data-object.
   const data = {}
   // If the chosen city is Helsinki. The train shedules to city center from the airport station will be fetched. 
   // Settings object has a boolean value for showPublicTransport.
   if (settings.showPublicTransport) {
    try {
     const publicTransportData = await PT.fetchTrains();
     const formattedPublicTransport = await miscHelpers.formatPublicTransport(publicTransportData)
     data.publicTransport = formattedPublicTransport
    }
    catch(err) {
     data.publicTransport = null
    }
   }
   // Getting flight schedules from api 
   const dep = await getFlights.getItem(settings.airport, 'dep');
   const arr = await getFlights.getItem(settings.airport, 'arr');
  // We format flight schedules and strip away all unnecessary information.
   const formattedDepartures = await flightDataHelpers.formatFlightData(dep.response, settings.timeLimit, 'departures')
   const formattedArrivals = await flightDataHelpers.formatFlightData(arr.response, settings.timeLimit, 'arrivals')
   // Fetch and format news. Settings object has a source for news (BBC, Financial Times etc.)
   const newsItems = await news.fetchNews(settings.newsSource);
   const formattedNews = await miscHelpers.formatNews(newsItems)
   // Fetch and format weather. Settings object has a city or place added ("Helsinki" or "Stockholm" etc.). 
   const weatherRaw = await weather.fetchWeather(settings.weather)
   const formattedWeather = await miscHelpers.formatWeatherData(weatherRaw)
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
