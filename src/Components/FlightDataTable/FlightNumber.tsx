import { useEffect, useState } from 'react'

interface FlightNumberType {
    flightNumber: string[]
}

const FlightNumber = (props: FlightNumberType) => {
    const [currentInd, setCurrentInd] = useState(0)

    useEffect(() => {
        if(props.flightNumber) {
            const timer = setTimeout(() => {
                if (currentInd + 1 < props.flightNumber.length) {
                    setCurrentInd(currentInd + 1)
                }
                else {
                    setCurrentInd(0)
                }
            }, 3000)
            return () => clearTimeout(timer)
        }
    }, [currentInd, props.flightNumber])

    return (
            <p>{props.flightNumber[currentInd]}</p>
    )
}
export default FlightNumber