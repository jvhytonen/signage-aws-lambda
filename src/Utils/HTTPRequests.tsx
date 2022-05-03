import { DepDataItems } from '../Components/FlightDataTable/Departures'
import { getFlightsWithinTimeLimits, handleCodeShareFlights } from './Helpers'

type fetchDataType = () => void

export const fetchDepData: fetchDataType = async () => {
    const response = await fetch('http://localhost:3000/schedulesTEST.json')
    const data = await response.json()
    const flightsWithinTimeLimit = getFlightsWithinTimeLimits(data.response, 21600)
    const flightsWithCodeShares: DepDataItems[] = handleCodeShareFlights(flightsWithinTimeLimit, 'departures')
    return flightsWithCodeShares
}
 
export const fetchArrData: fetchDataType = async () => {
    const response = await fetch('http://localhost:3000/schedulesArr.json')
    const data = await response.json()
    const flightsWithinTimeLimit = getFlightsWithinTimeLimits(data.response, 21600)
    const flightsWithCodeShares: DepDataItems[] = handleCodeShareFlights(flightsWithinTimeLimit, 'arrivals')  
    return flightsWithCodeShares
}