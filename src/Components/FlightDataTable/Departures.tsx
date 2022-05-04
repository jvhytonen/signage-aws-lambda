
import React from "react"
import Airline from "./Airline"
import FlightNumber from "./FlightNumber"
import Time from "./Time"
import Destination from "./Destination"
import TerminalGateBg from "./TerminalGateBg"


export interface DepDataItems {
    codeShareNr?: string
    airline: string[][]
    flightNr: string[][]
    destination: string
    depTime: string
    actualDep?: string
    estimatedDep?: string | null
    terminal?: string
    gate: string
}

export interface FlightDataType {
    data: DepDataItems[]
}


const Departures = (props: FlightDataType) => {
    let elem = document.getElementById('TableItem')
    let parent = elem?.parentElement?.offsetHeight
    let correctHeight = parent !== undefined ? `${parent / 8}px` : '100px'

    const rows = props.data.map((item: DepDataItems, index:number) => {
        return (
            <div key={index} style={{height: correctHeight}} id='TableItem' className='FlightDataTable w-full flex my-2'>
                <div className='w-[28%] h-full flex items-center justify-center'>
                 <Time originalTime={item.depTime} estTime={item.estimatedDep} actualTime={item.actualDep} type='departures'/>
                </div>
                <div className='w-[22%] h-full overflow-hidden'>
                <Airline airline={item.airline[0]}/>
                </div>
                <div className='w-[35%] h-full flex flex-col items-start justify-center overflow-hidden'>
                <Destination destination={item.destination}/>
                <div className='justify-self-end'>
                    <FlightNumber flightNumber={item.flightNr[0]}/>
                </div>
                </div>
                <div className='w-[15%] h-full flex items-center justify-center'>
                <TerminalGateBg gate={item.gate} terminal={item.terminal} type='departures'/>
                </div>
            </div>
        )
    }) 

    return (
        <>
     {rows}
        </>
    )
}

export default Departures