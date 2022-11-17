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