import { render, screen } from '@testing-library/react'
import TopBarLeft from "./TopBarLeft";

test('it is showing a current day and month in the left topbar', () => {
    render(<TopBarLeft/>)

    const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

    const testDate = new Date()
    const today = DAYS[testDate.getDay()]
    const thisMonth = MONTHS[testDate.getMonth()]
    const topBarDay = screen.getByText(today, {exact: false})
    const topBarMonth = screen.getByText(thisMonth, {exact: false})
    
    expect(topBarDay).toBeInTheDocument()
    expect(topBarMonth).toBeInTheDocument()
})