import {useState, useEffect} from 'react'
import TimeTable, { DepDataItemsType, ArrDataItemsType } from './TimeTable'

interface FlightDataType {
    departures: DepDataItemsType[][]
    arrivals: ArrDataItemsType[][]
}

const FlightData = (props: FlightDataType) => {
    const [currentInd, setCurrentInd] = useState(0)
    const [tableType, setTableType] = useState('departures')
    const [visibleData, setVisibleData] = useState(props.departures)
    
    useEffect(() => {
        if(props.departures || props.arrivals) {
            const timer = setTimeout(() => {
                if (tableType === 'departures' && (currentInd + 1) === props.departures.length) {
                    setTableType('arrivals')
                    setCurrentInd(0)
                    setVisibleData(props.arrivals)
                }
                else if (tableType === 'arrivals' && (currentInd + 1) === props.arrivals.length) {
                    setTableType('departures')
                    setCurrentInd(0)
                    setVisibleData(props.departures)
                }
                else {
                    setCurrentInd(currentInd + 1)
                }
            }, 3000)
            return () => clearTimeout(timer)
        }
    }, [currentInd])

    return (
       <TimeTable data={visibleData[currentInd]} type={tableType}/>
    )
}
export default FlightData