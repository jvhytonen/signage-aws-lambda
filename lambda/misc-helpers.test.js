import { it, expect, describe } from 'vitest'

import { formatWeatherData, removeHyphens, formatNewsDate } from './misc-helpers'

const exampleWeatherData = {
    adress: 'Helsinki',
    currentConditions: {
        temp: 12.5,
        icon: 'rain',
        conditions: "Rain, Overcast"
    },
    days: [
        {
            temp: 12.5,
            icon: 'thunder',
            description: 'Cloudy skies throughout the day with a chance of rain throughout the day.'
        }
    ]
}

describe('removeHyphens()', () => {
    it('should remove hyphens if it receives a string that has some', () => {
        const text = 'test-data';
        const textWithoutHyphens = 'testdata'

        const result = removeHyphens(text);

        expect(result).toBe(textWithoutHyphens)

    })
})
describe('formatNewsDate()', () => {
    it('should format date object to a correct form', () => {
        const publishedAt = '2022-10-27T13:49:27Z'
        const expectedTime = 'Oct 27 - 16:49'

        const result = formatNewsDate(publishedAt)
        
        expect(result).toBe(expectedTime)
    })
})

/* describe('formatWeatherData()', () => {

}) */