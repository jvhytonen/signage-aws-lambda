import { airports } from "./airports"

export const IataToCity = ( iataCode ) => {
    return airports[iataCode]
}
