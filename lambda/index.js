const PT = require('./getPublicTransport');
const getFlights = require('./getFlightItem');
const news = require('./getNews')
const helpers = require('./helpers')

// Hardcoded settings that can later be fetched from database if the user wants to change the airport or the news source
const settings = {
  url: 'https://airlabs.co/api/v9/schedules',
  airport: 'HEL',
  newsSource: 'bbc'
}

exports.handler = async (event, callback) => {
    
   const dep = await getFlights.getItem(settings, 'dep');
   const arr = await getFlights.getItem(settings, 'arr');
   const formattedDep = await helpers.formatData(dep.response, 7200, 'departures')
   const formattedArr = await helpers.formatData(arr.response, 7200, 'arrivals')
   const trainItems = await PT.fetchTrains();
   const newsItems = await news.fetchNews(settings.newsSource);
   const data = {
       departures: formattedDep,
       arrivals: formattedArr,
       news: newsItems,
       trains: trainItems
   };
   const response = {
       statusCode: 200,
       body: data
   };
    return response;
};
