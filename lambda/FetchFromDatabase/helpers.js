const airlines = require('./airlines')
const airports = require('./airports')

/**
 * This function will receive data outside this module, uses other functions in this module to format data
 * and returns data.
 * @param {object} data The incoming data.
 * @param {number} timeLimit The time in seconds for the range of the scheduled fligths.
 * @return {object} formattedFlights object ready to be used in the browser.
 */
const formatData = (data, timeLimit, type) => {
  const withinTimeLimits = getFlightsWithinTimeLimits(data, timeLimit)
  const formattedFlights = handleCodeShareFlights(withinTimeLimits, type)
  return formattedFlights
}

/**
 * Object from the API contains usually 6 hours of flight schedules, but this
 * will reduce the amount of flights to be shown according to the time limit given.
 *
 * @param {object} object Object with all flights
 * @param {number} timeLimit The time in seconds for the range of the scheduled fligths.
 * @return {object} objWithLimit contains those flights fitting the time range.
 */
const getFlightsWithinTimeLimits = (object, timeLimit) => {
  const objWithLimit = []
  const thisDate = new Date()
  // This server is located in Stockholm so we need to add additional 3600 seconds (1 hour) to show right schedules.
  const thisMoment = Math.round(thisDate.getTime() / 1000) + 3600

  for (let i = 0; i < object.length; i++) {
    if (object[i].dep_time_ts - thisMoment < timeLimit)
      objWithLimit.push(object[i])
  }
  return objWithLimit
}
/**
 * Object from the API will show even the codeshare flights as an individual flights.
 * This function will merge ccodeshare flights in to one single flight containing all codeshare flight numbers
 * and airlines.
 * @param {object} flightObj Object with all codeshare flights as individual flights.
 * @param {string} type The type of the schedule: Departure or Arrival
 * @return {object} mergedFlights codeshare flights merged to their administrative flight.
 */
const handleCodeShareFlights = (flightObj, type) => {
  let codeShares = []
  let admins = []
  for (let i = 0; i < flightObj.length; i++) {
    // First all flights that ARE NOT codeshare-filghts will be pushed into an own array. The continue-statement will make sure
    // the loop moves to next index
    if (flightObj[i].cs_flight_iata !== null) {
      const csItem = {
        airline: flightObj[i].airline_iata,
        flightNr: flightObj[i].flight_iata,
        codeShareNr: flightObj[i].cs_flight_iata
      }
      codeShares.push(csItem)
      continue
    }
    // Depending on the type of the data (departure/arrival) necessary information will be added to object and pushed to an array.
    else if (type === 'departures') {
      const AdminItem = {
        airline: [[AirlineIataToName(flightObj[i].airline_iata)]],
        flightNr: [[flightObj[i].flight_iata]],
        destination: IataToCity(flightObj[i].arr_iata),
        depTime: formatDate(flightObj[i].dep_time),
        actualDep: flightObj[i].dep_actual
          ? formatDate(flightObj[i].dep_actual)
          : null,
        estimatedDep: flightObj[i].dep_estimated
          ? formatDate(flightObj[i].dep_estimated)
          : null,
        terminal: flightObj[i].dep_terminal,
        gate: flightObj[i].dep_gate
      }
      admins.push(AdminItem)
    } else if (type === 'arrivals') {
      const AdminItem = {
        airline: [[AirlineIataToName(flightObj[i].airline_iata)]],
        flightNr: [[flightObj[i].flight_iata]],
        depDestination: IataToCity(flightObj[i].dep_iata),
        arrTime: formatDate(flightObj[i].arr_time),
        actualArr: flightObj[i].arr_actual
          ? formatDate(flightObj[i].arr_actual)
          : null,
        estimatedArr: flightObj[i].arr_estimated
          ? formatDate(flightObj[i].arr_estimated)
          : null,
        terminal: flightObj[i].arr_terminal,
        baggage: flightObj[i].arr_baggage
      }
      admins.push(AdminItem)
    }
  }
  // The mergeCodeShares will make sure the codeshare flight numbers and airlines are added to the administrator flight object.
  const mergedFlights = mergeCodeShares(codeShares, admins)
  return mergedFlights
}

const mergeCodeShares = (codeShareFlights, adminFlights) => {
  // The function will loop codeshare flights and finds their administrative host. All necessary data (flight number and airline) are
  // added to the object of the administrative flight.
  for (let i = 0; i < codeShareFlights.length; i++) {
    let csItem = codeShareFlights[i].codeShareNr
    let flightNr = codeShareFlights[i].flightNr
    let csAirline = AirlineIataToName(codeShareFlights[i].airline)
    adminFlights.forEach(item => {
      if (item.flightNr[0][0] === csItem) {
        const newNr = FormatArrays(item.flightNr, flightNr)
        item.flightNr = newNr
        const newAirline = FormatArrays(item.airline, csAirline)
        item.airline = newAirline
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
/* 
const FormatAirlines = (originalFlightArr, newFlightNr) => {
  for (let i = 0; i < originalFlightArr.length; i++) {
    if (originalFlightArr[i].length < 4) {
      originalFlightArr.push(newFlightNr)
      break
    }
  }
  return originalFlightArr
} */

const FormatArrays = (originalArr, newItem) => {
  for (let i = 0; i < originalArr.length; i++) {
    if (originalArr[i].length === 4) {
      continue
    }
    if (originalArr[i].length < 4) {
      originalArr[i].push(newItem)
    }
    if (i === originalArr.length - 1 && originalArr[i].length === 4) {
      originalArr.push([newItem])
    }
  }
  return originalArr
}

const IataToCity = iataCode => {
  return airports[iataCode]
}

const formatDate = date => {
  return date.slice(-5)
}

module.exports = {
  formatData
}
