import NewsContainer from "./NewsContainer";
import {exampleReadyData} from '../../tests/news-test-data'
import {exmplFormattedWeatherData} from '../../tests/weather-test-data'
import { render, screen } from '@testing-library/react'

it('shows a "No data" -text 2 times if no weather or news data is delivered into the component', () => {
    render(<NewsContainer/>)
    const noDataText = screen.getAllByText('No data', {exact: false})
    expect(noDataText[0]).toBeInTheDocument()
    expect(noDataText[1]).toBeInTheDocument()
}) 

it('shows a "No data" -text only 1 time if only Weather-data is missing', () => {
    render(<NewsContainer news={exampleReadyData}/>)
    const noDataText = screen.getByText('No data', {exact: false})
    expect(noDataText).toBeInTheDocument()
})

it('shows a "No data" -text only 1 time if only News-data is missing', () => {
    render(<NewsContainer weather={exmplFormattedWeatherData}/>)
    const noDataText = screen.getByText('No data', {exact: false})
    expect(noDataText).toBeInTheDocument()
})

it('shows no "No data" at all when both Weather and News components are delivered', () => {
    render(<NewsContainer news={exampleReadyData} weather={exmplFormattedWeatherData}/>)
    const noDataText = screen.queryByText('No data')
    expect(noDataText).not.toBeInTheDocument()
})