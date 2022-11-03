import { it, expect, describe } from 'vitest'

import { AirlineIataToName, IataToCity, formatDate } from './flight-data-helpers'

describe('AirlineIataToName()', () => {
    it('should return United Airlines with its IATA-code', () => {
        const iataCode = 'UA'
        const airline = 'United Airlines'
    
        const result = AirlineIataToName(iataCode)
    
        expect(result).toBe(airline)
    })
    
    it('should return the same IATA-code as passed when there are no given IATA-code', () => {
        const iataCode = 'FAKEIATA'
        
        const result = AirlineIataToName(iataCode)
    
        expect(result).toBe(iataCode)
    })
})

describe('IataToCity()', () => {
   it('should return the name of the city belonging to IATA-code', () => {
    const cityIATA = 'TMB'
    const city = 'Miami'
    
    const result = IataToCity(cityIATA)

    expect(result).toBe(city)
   })
}) 

describe('formatDate()', () => {
    it('should remove extra characters from date not needed in the client', () => {
        const time = '2022-04-14 11:35'
        const sliced = '11:35'

        const result = formatDate(time)

        expect(result).toBe(sliced)
    })
 }) 
 
