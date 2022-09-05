
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

    const rows = props.data.map((item: DepDataItems, index: number) => {
        return (
            <div key={index} id='TableItem' className='FlightDataTable w-full flex my-2'>
                <div className='w-[33%] h-full flex items-center justify-center'>
                    <Time originalTime={item.depTime} estTime={item.estimatedDep} actualTime={item.actualDep} type='departures' />
                </div>
                {/*  <div className='w-[22%] h-full overflow-hidden'>
                <Airline airline={item.airline[0]}/>
                </div> */}
                <div className='w-[22%] flex items-center justify-center'>
                    <FlightNumber flightNumber={item.flightNr[0]} />
                </div>
                <div className='w-[30%] flex items-center justify-start text-2xl ml-4'>
                    <Destination destination={item.destination} />
                </div>
                <div className='w-[15%] h-full flex items-center justify-center'>
                    <TerminalGateBg gate={item.gate} terminal={item.terminal} type='departures' />
                </div>
            </div>
        )
    })
    //  const rows = "Here will be rows once we get flight data here"
    return (
        <>
            {rows}
        </>
    )
}

export default Departures