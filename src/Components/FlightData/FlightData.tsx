import {useState, useEffect} from 'react'
import TimeTable, { TimeTableType } from './TimeTable'

export interface FlightDataType {
    flights: TimeTableType[]
}

const FlightData = (props: FlightDataType) => {
    const [currentInd, setCurrentInd] = useState(0)

    useEffect(() => {
        if(props.flights) {
            const timer = setTimeout(() => {
           if (currentInd + 1 < props.flights.length) {
                    setCurrentInd(currentInd + 1)
                }
                else {
                    setCurrentInd(0)
                }
            }, 30000)
            return () => clearTimeout(timer)
        }
    }, [currentInd, props.flights])

    return (
       <TimeTable {...props.flights[currentInd]}/>
    )
}
export default FlightData

