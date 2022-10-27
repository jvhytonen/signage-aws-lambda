const settingsFn = require('./get-settings')
const PT = require('./get-public-transport');
const getFlights = require('./get-flight-item');
const news = require('./get-news')
const weather = require('./get-weather')
const flightHelpers = require('./flight-data-helpers')
const miscHelpers = require('./misc-helpers')


/**
 * Lambda-function index.js in AWS Cloud. 
 * 
 * @param {event} event Event triggering the function.
 * @return {object} response object containing fetched data ready to be shown in the browser.
 */

exports.handler = async (event, callback) => {
    // We fetch data from database via another Lambda function. Temporarily a hard-coded value of username is used before AWS API Gateway Query params is implemented. 
    // Username will be received later from event-object 
   const settings = await settingsFn.getUserSettings('tester')
   // We return this data-object back to the client. 
   const data = {}
   // Getting flight schedules from api 
   const dep = await getFlights.getItem(settings.airport, 'dep');
   const arr = await getFlights.getItem(settings.airport, 'arr');
   // We format flight schedules and strip away all unnecessary information.
   const formattedDepartures = await flightHelpers.formatFlightData(dep.response, 7200, 'departures')
   const formattedArrivals = await flightHelpers.formatFlightData(arr.response, 7200, 'arrivals')
   // If the chosen city is Helsinki. There is a possibility to fetch train shedules to city center. 
   // Settings object has a boolean value for showPublicTransport.
   if (settings.showPublicTransport) {
    const publicTransportData = await PT.fetchTrains();
    const formattedPublicTransport = await miscHelpers.formatPublicTransport(publicTransportData)
    data.publicTransport = formattedPublicTransport
   }
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
