import {useState} from 'react'
import TimeTable, { DepDataItemsType, ArrDataItemsType } from './TimeTable'

interface FlightDataType {
    departures: DepDataItemsType[][]
    arrivals: ArrDataItemsType[][]
}

const FlightData = (props: FlightDataType) => {
    return (
       <TimeTable data={props.departures}/>
    )
}
export default FlightData