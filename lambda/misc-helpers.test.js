import { it, expect, describe } from 'vitest'

import { formatWeatherData, removeHyphens, formatNewsDate, formatPublicTransport, secondsToTime, formatNews } from './misc-helpers'
import {exmplWeatherApiData, exmplFormattedWeatherData } from './lambda-test-variables/weather-test-variables'
import {exmplPTAPIData, exmplPTReadyData} from './lambda-test-variables/public-tp-test-variables'
import {exmplApiData as NewsAPIExample, exampleReadyData as NewsReadyExample} from './lambda-test-variables/news-test-variables'


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

 describe('formatWeatherData()', () => {
    it('should create an object with only necessary data inside it for the client', () => {
        const original = exmplWeatherApiData
        const ready = exmplFormattedWeatherData

        const result = formatWeatherData(original)

        expect(result).toEqual(ready)

    })
}) 

describe('secondsToTime()', () => {
    it('should convert seconds from midnight to time in format HH:MM', () => {
  //      const original = ['40800', '41160', '4200']
  //      const ready = ['11:20', '11:26', '11:40']
        const sinceMidNight = 40800
        const clockTime = '11:20'

        const result = secondsToTime(sinceMidNight)

        expect(result).toBe(clockTime)
    })
}) 

describe('formatPublicTransport()', () => {
    it('should find stopTimes of the public transport from the object and take care of formatting the times HH:MM', () => {
        const original = exmplPTAPIData
        const ready = exmplPTReadyData

        const result = formatPublicTransport(original)

        expect(result).toEqual(ready)
    })
}) 

describe('formatNews()', () => {
    it('should send news-object into the functions formatting the published -time', () => {
        const original = NewsAPIExample
        console.log(NewsAPIExample)
        const ready = NewsReadyExample

        const result = formatNews(original)

        expect(result).toEqual(ready)
    })
}) 