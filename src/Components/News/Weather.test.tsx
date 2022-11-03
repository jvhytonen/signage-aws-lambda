import Weather from "./Weather";
import {exmplFormattedWeatherData} from '../../tests/weather-test-data'
import { render, screen } from '@testing-library/react'

it('shows the location as Helsinki as in the test data', () => {
    render(<Weather {...exmplFormattedWeatherData}/>)
    
    const location = screen.getByText('Helsinki')

    expect(location).toBeInTheDocument()
})

it('shows a correct current weather forecast as in the test data', () => {
    render(<Weather {...exmplFormattedWeatherData}/>)
    const testTemp = exmplFormattedWeatherData.currentCond.temp
    const testIcon = exmplFormattedWeatherData.currentCond.icon

    // Temperature must be exact:false -mode because it's a number.
    const temperature = screen.getByText(testTemp, {exact: false})
    // This will query img-elements and their aria-label-values. 
    const icon = screen.getAllByRole('img', {name: testIcon})

    expect(temperature).toBeInTheDocument()
    expect(icon[0]).toBeInTheDocument()
})