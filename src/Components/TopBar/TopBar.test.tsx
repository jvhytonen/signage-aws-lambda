import TopBar from "./TopBar";
import { exmplPTReadyData } from '../../tests/public-transport-test-data'
import { render, screen } from '@testing-library/react'


it('shows Trains to city center text if public transport data is delivered', () => {
    render(<TopBar publicTransport={exmplPTReadyData} />)
    
    const trainsText = screen.getByText('Trains to city center:')

    expect(trainsText).toBeInTheDocument();
})

it('does not show "Trains to city center" if public transport data is not delivered', () => {
    render(<TopBar />)

    const trainsText = screen.queryByText('Trains to city center:')
    expect(trainsText).not.toBeInTheDocument()
})