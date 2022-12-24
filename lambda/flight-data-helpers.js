const airlines = require('./airlines')
const airports = require('./airports')

/**
 * This function will receive data outside this module, uses other functions in this module to format data
 * and returns data.
 * @param {object} data The incoming data.
 * @param {number} timeLimit The time in seconds for the range of the scheduled fligths.
 * @return {object} formattedFlights object ready to be used in the browser.
 */
const formatFlightData = async (data, timeLimit, type) => {
  const withinTimeLimits = await getFlightsWithinTimeLimits(data, timeLimit, type)
  // The API sorts data by estimated time, we want to show it based on scheduled time.
  const sortedByTime = await sortByTime(withinTimeLimits, type)
  // We find codeshare flights and the "real" admin flights
  const codeShareFlights = await findCodeShares(sortedByTime)
  const adminFlights = await findAdmins(sortedByTime, type)
  // Codeshares merged with admins.
  const formattedFlights = await mergeCodeShares(codeShareFlights, adminFlights)
  // We want to show max 15 flights per page. 
  const groupedFlights = await stackTimeTables(formattedFlights, type)
  return groupedFlights
}

const sortByTime = (flightObj, type) => {
  //The dep_time_ts is the original scheduled time in epoch-format. Therefore we sort the data based on that. 
  if (type === 'departures') {
    flightObj.sort((a, b) => (a.dep_time_ts > b.dep_time_ts) ? 1: -1)
  }
  if (type === 'arrivals') {
    flightObj.sort((a, b) => (a.arr_time_ts > b.arr_time_ts) ? 1: -1)
  }
  return flightObj
}

/**
 * Object from the API contains usually 6 hours of flight schedules. This function
 * will reduce the amount of flights to be shown according to the time limit given.
 *
 * @param {object} originalObject Object with all flights
 * @param {number} timeLimit The time in seconds for the range of the scheduled fligths.
 * @return {object} objWithLimit contains those flights fitting the time range.
 */
const getFlightsWithinTimeLimits = (originalObj, timeLimit, type) => {
  const thisDate = new Date()
// This server is located in Stockholm so we need to add additional 3600 seconds (1 hour) to show right schedules.
const thisMoment = Math.round(thisDate.getTime() / 1000) + 3600
const objWithLimits = []
if (type === 'departures') {
  for (let i = 0; i < originalObj.length; i++) {
    if (originalObj[i].dep_time_ts - thisMoment < timeLimit) {
      if ((!originalObj[i].hasOwnProperty('dep_actual_ts')) || thisMoment - originalObj[i].dep_actual_ts < 7200) {
        objWithLimits.push(originalObj[i]) 
       } 
     }
   }
}
if (type === 'arrivals') {
  for (let i = 0; i < originalObj.length; i++) {
    if (originalObj[i].arr_time_ts - thisMoment < timeLimit) {
      if ((!originalObj[i].hasOwnProperty('arr_actual_ts')) || thisMoment - originalObj[i].arr_actual_ts < 7200) {
        objWithLimits.push(originalObj[i]) 
       } 
     }
   }
}

return objWithLimits
}

/**
 * The amount of visible fliths in the screen is 15 at the time. Therefore the 
 *flightdata must be spliced into separate arrays each consisting 15 flights.
 * 
 * @param {object} allFlights allflights previously formattedn. 
 * @return {array of objects} flight data spliced into an array of 14 items.
 */
 const stackTimeTables = (allFlights, type) => {
  let adjustedFlights = []
  let adjustedFlightsWithTypes = []
  while (allFlights.length) {
      adjustedFlights.push(allFlights.splice(0,15))
  }
  // Type of the page is "Departures" or "Arrivals". This word will be shown above flight data. 
  for (const page of adjustedFlights) {
    let onePage = {}
    onePage.type = type
    onePage.data = page
    adjustedFlightsWithTypes.push(onePage)
  }
  return adjustedFlightsWithTypes
}

/**
 * All flights that ARE NOT codeshare-filghts will be pushed into an own array.  
 * 
 * @param {object} dataObj All flight data object coming from the API. 
 * @return {array of objects} codeShares containing only codeshare flights.
 */
const findCodeShares = (dataObj) => {
  let codeShares = []
  for (let i = 0; i < dataObj.length; i++) {
    // If the object does not have cs_flight_iata -key, then they are admin flights that are ignored here.
    if (dataObj[i].cs_flight_iata) {
      const csItem = {
        airline: dataObj[i].airline_iata,
        flightNr: dataObj[i].flight_iata,
        codeShareNr: dataObj[i].cs_flight_iata
      }
      codeShares.push(csItem)
    } 
  }
  return codeShares
}
/**
 * All flights where there is only one airline owning the whole flight or the airline is the admin
 * are selected here. These flights need all kinds of data: destination, airline, flight number, scheduled time
 * actual (departure/arrival) time, and status (landed, active, scheduled, cancelled)  
 * 
 * @param {object} dataObj All flight data object coming from the API.
 * @param {string} type departures or arrivals
 * @return {array of objects} admins containing only admin flights.
 */
const findAdmins = (dataObj, type) => {
  const admins = []
  for (let i = 0; i < dataObj.length; i++) {
    console.log(dataObj[i].dep_iata)
    if (!dataObj[i].cs_flight_iata) {
      if (type === 'departures') {
        const AdminItem = {
          airline: AirlineIataToName(dataObj[i].airline_iata),
          flightNr: [[dataObj[i].flight_iata]],
          destination: IataToCity(dataObj[i].arr_iata),
          scheduled: formatDate(dataObj[i].dep_time),
          actual: dataObj[i].dep_actual
            ? formatDate(dataObj[i].dep_actual)
            : null,
          estimated: dataObj[i].dep_estimated
            ? formatDate(dataObj[i].dep_estimated)
            : null,
          status: dataObj[i].status
        }
        admins.push(AdminItem)
      }
      else if (type === 'arrivals') {
        const AdminItem = {
          airline: AirlineIataToName(dataObj[i].airline_iata),
          flightNr: [[dataObj[i].flight_iata]],
          destination: IataToCity(dataObj[i].dep_iata),
          scheduled: formatDate(dataObj[i].arr_time),
          actual: dataObj[i].arr_actual
            ? formatDate(dataObj[i].arr_actual)
            : null,
          estimated: dataObj[i].arr_estimated
            ? formatDate(dataObj[i].arr_estimated)
            : null,
          status: dataObj[i].status
        }
        admins.push(AdminItem)
      }
    }
  }
  return admins
}

const mergeCodeShares = (codeShareFlights, adminFlights) => {
  // The function will loop codeshare flights and finds their administrative host. All necessary data (flight number and airline) are
  // added to the object of the administrative flight.
  for (let i = 0; i < codeShareFlights.length; i++) {
    let csItem = codeShareFlights[i].codeShareNr
    let flightNr = codeShareFlights[i].flightNr
    adminFlights.forEach(item => {
      if (item.flightNr[0][0] === csItem) {
        item.flightNr[0].push(flightNr)
      }
    })
  }
  return adminFlights
}

// This function will search the name of the airline based on the IATA-code.
// Object has key: "AIRLINE IATA-code" value: "Airline name"
const AirlineIataToName = iataCode => {
  const idx = airlines.findIndex(item => {
    return item.iata === iataCode
  })
  const name = idx === -1 ? iataCode : airlines[idx].airline
  return name
}

// Converts Airport IATA Code to its' name.
const IataToCity = iataCode => {
  return airports[iataCode]
}

// Removes year, month and day from FlightDataAPI-schedules. Leaves only time. 
const formatDate = date => {
  return date.slice(-5)
}

module.exports = {
  formatFlightData,
}
