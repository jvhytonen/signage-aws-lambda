import { airlines } from "./airlines"

export const AirlineIataToName = ( iataCode ) => {
    const idx = airlines.findIndex(item => {
        return item.iata === iataCode
    })
    const name = idx === -1 ? iataCode: airlines[idx].airline
    return name
}

export const FormatAirlines = ( originalFlightArr, newFlightNr ) => {
    for (let i = 0; i<originalFlightArr.length; i++) {
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
        if (i === (originalArr.length - 1) && originalArr[i].length === 4 ) {
            originalArr.push([newItem])
        }
    }
    return originalArr
}