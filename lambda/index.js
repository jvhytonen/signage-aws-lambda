const PT = require('./getPublicTransport');
const getFlights = require('./getFlightItem');
const news = require('./getNews')
const weather = require('./getWeather')
const helpers = require('./helpers')


const settings = {
  url: 'https://airlabs.co/api/v9/schedules',
  airport: 'HEL',
  newsSource: 'bbc',
  weather: 'Helsinki',
  showPublicTransport: true,
  publicTransport: 'Helsinki',
  adsInfo: [
    {
    type: 'info',
    data: {
        heading: 'This is the heading',
        text: 'Hello worldd',
        bgColor: 'red-300'
    },
},
{
    type: 'info',
    data: {
        heading: 'This is the heading number 2',
        text: 'Hello worldd',
        bgColor: 'red-300'
    },
},
{
    type: 'info',
    data: {
        heading: 'This is the third',
        text: 'HelloAhaa worldadsadasdasdasd',
        bgColor: 'red-300'
    },
},
{
    type: 'ad',
    data: {
       url: 'https://i.giphy.com/media/h2CN7TlrNWxBCyUSqk/giphy.webp'
    }
}
]
}

exports.handler = async (event, callback) => {
   const data = {}
   const dep = await getFlights.getItem(settings, 'dep');
   const arr = await getFlights.getItem(settings, 'arr');
   const formattedDepartures = await helpers.formatFlightData(dep.response, 7200, 'departures')
   const formattedArrivals = await helpers.formatFlightData(arr.response, 7200, 'arrivals')
   if (settings.showPublicTransport) {
    const publicTransportData = await PT.fetchTrains();
    const formattedPublicTransport = await helpers.formatPublicTransport(publicTransportData)
    data.publicTransport = formattedPublicTransport
   }
   const newsItems = await news.fetchNews(settings.newsSource);
   const formattedNews = await helpers.formatNews(newsItems)
   const weatherRaw = await weather.fetchWeather(settings.weather)
   const formattedWeather = await helpers.formatWeatherData(weatherRaw)
   data.flights = [...formattedDepartures, ...formattedArrivals]
   data.news = formattedNews
   data.weather = formattedWeather
   const response = {
       statusCode: 200,
       body: data
   };
   return response;
};
