import { airlines } from './airlines'
import { airports } from './airports'

export const getFlightsWithinTimeLimits = (object, timeLimit) => {
  const objWithLimit = []
  const firstDepTime = object[0].dep_time_ts

  for (let i = 0; i < object.length; i++) {
    if (object[i].dep_time_ts - firstDepTime < timeLimit)
      objWithLimit.push(object[i])
  }

  return objWithLimit
}

export const handleCodeShareFlights = (flightObj, type) => {
  let codeShares = []
  let admins = []
  for (let i = 0; i < flightObj.length; i++) {
    if (flightObj[i].cs_flight_iata !== null) {
      const csItem = {
        airline: flightObj[i].airline_iata,
        flightNr: flightObj[i].flight_iata,
        codeShareNr: flightObj[i].cs_flight_iata
      }
      codeShares.push(csItem)
      continue
    } else if (type === 'departures'){
      const AdminItem = {
        airline: [[AirlineIataToName(flightObj[i].airline_iata)]],
        flightNr: [[flightObj[i].flight_iata]],
        destination: IataToCity(flightObj[i].arr_iata),
        depTime: formatDate(flightObj[i].dep_time),
        actualDep: flightObj[i].dep_actual,
        estimatedDep: flightObj[i].dep_estimated
          ? formatDate(flightObj[i].dep_estimated)
          : null,
        terminal: flightObj[i].dep_terminal,
        gate: flightObj[i].dep_gate
      }
      admins.push(AdminItem)
    }
    else if (type === 'arrivals') {
        const AdminItem = {
            airline: [[AirlineIataToName(flightObj[i].airline_iata)]],
            flightNr: [[flightObj[i].flight_iata]],
            depDestination: IataToCity(flightObj[i].dep_iata),
            arrTime: formatDate(flightObj[i].arr_time),
            actualArr: flightObj[i].arr_actual,
            estimatedArr: flightObj[i].arr_estimated ? formatDate(flightObj[i].arr_estimated) : ' ',
            terminal: flightObj[i].arr_terminal,
            baggage: flightObj[i].arr_baggage
        }
        admins.push(AdminItem)
    }
  }
  const mergedFlights = mergeCodeShares(codeShares, admins)
  return mergedFlights
}

const mergeCodeShares = (codeShareFlights, adminFlights) => {
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

export const AirlineIataToName = iataCode => {
  const idx = airlines.findIndex(item => {
    return item.iata === iataCode
  })
  const name = idx === -1 ? iataCode : airlines[idx].airline
  return name
}

export const FormatAirlines = (originalFlightArr, newFlightNr) => {
  for (let i = 0; i < originalFlightArr.length; i++) {
    if (originalFlightArr[i].length < 4) {
      originalFlightArr.push(newFlightNr)
      break
    }
  }
  return originalFlightArr
}

export const FormatArrays = (originalArr, newItem) => {
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

export const IataToCity = iataCode => {
  return airports[iataCode]
}

export const formatDate = date => {
  return date.slice(-5)
}
