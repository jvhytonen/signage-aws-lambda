import AdsInfo from "./AdsInfo";
import { infoOnly, adsOnly } from '../../tests/ads-info-test-data'
import { render, screen } from '@testing-library/react'

it('will show content via Info-component when datatype is info', () => {
    render(<AdsInfo info={infoOnly}/>)

    // This word will be found on test data.
    const infoContent = screen.getByText("Breakfast")

    expect(infoContent).toBeInTheDocument()
})

it('will show an ad image or gif when datatype is ad', () => {
    render(<AdsInfo info={adsOnly}/>)

    const adUrl = adsOnly[0].url
    // Tester will look for aria-label-value. It should have the same name than the url-address where the image is. 
    const url = screen.getByRole('img', {name: adUrl})

    expect(url).toBeInTheDocument()
})