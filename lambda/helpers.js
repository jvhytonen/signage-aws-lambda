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
  const withinTimeLimits = await getFlightsWithinTimeLimits(data, timeLimit)
  const formattedFlights = await handleCodeShareFlights(withinTimeLimits, type)
  const groupedFlights = await groupTimeTables(formattedFlights, type)
  return groupedFlights
}

/**
 * Object from the API contains usually 6 hours of flight schedules. This function
 * will reduce the amount of flights to be shown according to the time limit given.
 *
 * @param {object} originalObject Object with all flights
 * @param {number} timeLimit The time in seconds for the range of the scheduled fligths.
 * @return {object} objWithLimit contains those flights fitting the time range.
 */
 const getFlightsWithinTimeLimits = (originalObj, timeLimit) => {
    const thisDate = new Date()
  // This server is located in Stockholm so we need to add additional 3600 seconds (1 hour) to show right schedules.
  const thisMoment = Math.round(thisDate.getTime() / 1000) + 3600
   
  const objWithLimits = []

  for (let i = 0; i < originalObj.length; i++) {
   if (originalObj[i].dep_time_ts - thisMoment < timeLimit) {
     if ((!originalObj[i].hasOwnProperty('dep_actual_ts')) || thisMoment - originalObj[i].dep_actual_ts < 7200) {
       objWithLimits.push(originalObj[i]) 
      } 
    }
  }
  return objWithLimits
}

/**
 * The amount of visible fliths in the screen is 14 at the time. Therefore the 
 *flightdata must be spliced into separate arrays each consisting 14 flights. Also the type of the
 *flight data (departures or arrivals) will be saved to be shown in the heading in the signage. 
 * 
 * @param {object} allFlights allflights previously formattedn. 
 * @param {string} type type of flights: departures or arrivals
 * @return {array of objects} flight data spliced into an array of 14 items.
 */
const groupTimeTables = (allFlights, type) => {
    let groupedFlights = {}
    let groupArr = []
    while (allFlights.length) {
      groupedFlights.onePage = allFlights.splice(0,15)
      groupedFlights.type = type 
      groupArr.push(groupedFlights)
    }
    return groupedFlights
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
  // Array for codeshare-flights.
  let codeShares = []
  // Array for the "metal" i.e.  administrative airline flight that really operates the flight.
  let admins = []
  for (let i = 0; i < flightObj.length; i++) {
    // First all flights that ARE NOT codeshare-filghts will be pushed into an own array. The continue-statement will make sure
    // the loop moves to the next index.
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
        airline: AirlineIataToName(flightObj[i].airline_iata),
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
        airline: AirlineIataToName(flightObj[i].airline_iata),
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
    adminFlights.forEach(item => {
      if (item.flightNr[0][0] === csItem) {
        const newNr = FormatArrays(item.flightNr, flightNr)
        item.flightNr = newNr
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

const secondsToTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    let minutes = (seconds % 3600) / 60;
    if (minutes < 10) {
        minutes = "0" + minutes.toString()
    }
    const time = hours.toString() + ':' + minutes.toString();
    return time
}

// For formatting public transport times.
const formatPublicTransport = (transportArr) => {
  console.log(transportArr.data.station.stoptimesWithoutPatterns[0])
    for (let i = 0; i < transportArr.data.station.stoptimesWithoutPatterns.length; i++){
      transportArr.data.station.stoptimesWithoutPatterns[i].scheduledDeparture = secondsToTime(transportArr.data.station.stoptimesWithoutPatterns[i].scheduledDeparture);
    }
    return transportArr
}

const formatNews = (news) => {
  const formattedNews = news.articles.map(o => ({ ...o, publishedAt: formatNewsDate(o.publishedAt) }))
  
 // console.log(formattedNews)
  return formattedNews
}

// This is used in formatNewsDate -function
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

/**
 * This function will format the date shown in the News-component.
 * 
 * @param {string} apiDate date coming from the API. 
 * @return {string} fullDate a string with only day, month, hours and minutes in clean order.
 */
const formatNewsDate = (apiDate) => {
    let incomingDate = new Date(apiDate)
    // Adding two hours in seconds to the time for being in Finland. 
    let localTime = new Date(incomingDate.getTime() + 7200)
    // The short name of the month in english from the array.
    let month = MONTHS[localTime.getMonth()]
    // We must add extra 0 to the time and days if they are under 10 because it looks better. 
    let day = localTime.getDate() < 10 ? "0" + localTime.getDate() : localTime.getDate() 
    let hours = localTime.getHours() < 10 ? "0"+ localTime.getHours() : localTime.getHours()
    let minutes = localTime.getMinutes() < 10 ? "0"+localTime.getMinutes() : localTime.getMinutes()
    let fullDate = month + ' ' + day + ' - ' + hours + ':' + minutes
    return fullDate
}

module.exports = {
  formatFlightData,
  formatPublicTransport,
  formatNews
}
