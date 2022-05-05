import { DepDataItems } from '../Components/FlightDataTable/Departures'
import { getFlightsWithinTimeLimits, handleCodeShareFlights } from './Helpers'

type fetchDataType = () => object | string

export const fetchDepData: fetchDataType = async () => {
    try {
        const data = await fetch('http://localhost:3000/schedulesTEST.json')
        const parsedData = await data.json()
        const flightsWithinTimeLimit = getFlightsWithinTimeLimits(parsedData.response, 3600)
        const flightsWithCodeShares: DepDataItems[] = handleCodeShareFlights(flightsWithinTimeLimit, 'departures')
     
        return flightsWithCodeShares
    }
   catch(error) {
       return null
   }
}
 
export const fetchArrData: fetchDataType = async () => {
    const response = await fetch('http://localhost:3000/schedulesArr.json')
    const data = await response.json()
    const flightsWithinTimeLimit = getFlightsWithinTimeLimits(data.response, 21600)
    const flightsWithCodeShares: DepDataItems[] = handleCodeShareFlights(flightsWithinTimeLimit, 'arrivals')  
    return flightsWithCodeShares
}