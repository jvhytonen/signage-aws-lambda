import News from "./News";
import { exampleReadyData } from '../../tests/news-test-data'
import { render, screen } from '@testing-library/react'

it('shows all the necessary properties of news', () => {
    render(<News
        title={exampleReadyData[0].title}
        description={exampleReadyData[0].description}
        urlToImage={exampleReadyData[0].urlToImage} />)
    
    const title = screen.getByText(exampleReadyData[0].title)
    const desc = screen.getByText(exampleReadyData[0].description)
    const url = screen.getByRole('img', {name: exampleReadyData[0].urlToImage})

   expect(title).toBeInTheDocument()
   expect(desc).toBeInTheDocument()
   expect(url).toBeInTheDocument()
})

/* it('shows a correct current weather forecast as in the test data', () => {
    render(<Weather {...exmplFormattedWeatherData}/>)
    const testTemp = exmplFormattedWeatherData.currentCond.temp
    const testIcon = exmplFormattedWeatherData.currentCond.icon

    // Temperature must be exact:false -mode because it's a number.
    const temperature = screen.getByText(testTemp, {exact: false})
    // This will query img-elements and their aria-label-values. 
    const icon = screen.getAllByRole('img', {name: testIcon})

    expect(temperature).toBeInTheDocument()
    expect(icon[0]).toBeInTheDocument()
}) */