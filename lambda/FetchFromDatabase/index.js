const getFlights = require('./getFlightItem')

const settings = {
    airport: 'HEL'
}

exports.handler = async (event, callback) => {
    
   const departures = await getFlights.getItem("Timetables", settings.airport, 'DEP');
   const arrivals = await getFlights.getItem("Timetables", settings.airport, 'ARR');
   const data = {
       departures: departures.Item.data.S,
       arrivals: arrivals.Item.data.S
   }
   const response = {
       statusCode: 200,
       body: data
   };
    return response;
};
