import React from "react"
import Departures, { DepDataItems } from './Departures'
import TopBar from "./TopBar"
import Arrivals, { ArrDataItemsType } from "./Arrivals"


export interface AppType {
    departures: DepDataItems[]
    arrivals: ArrDataItemsType[]
}
export interface FlightDataType {
    data: AppType
}

const FlightDataTable = (props: FlightDataType) => {
    let elem = document.getElementById('TableItem')
    let parent = elem?.parentElement?.offsetHeight
    let correctHeight = parent !== undefined ? `${parent / 8}px` : '100px'
    return (
        <div className='w-full h-full'>
            <div className='h-10 w-5/6 m-auto flex items-center justify-center'>
                <TopBar direction='departures' date="2.5.2022" />
            </div>
            <div className='w-full h-full flex justify-around'>
                <div className='h-full w-[40%] border border-indigo-600'>
                    {props.data === undefined ? <h1>No data</h1> : <Departures data={props.data.departures} />}
                </div>
                <div className='h-full w-[40%] border border-indigo-600'>
                    {props.data === undefined ? <h1>No data</h1> : <Arrivals data={props.data.arrivals} />}
                </div>
            </div>
        </div>
    )
}
export default FlightDataTable
