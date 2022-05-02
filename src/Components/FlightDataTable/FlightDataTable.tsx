import React from "react"
import Airline from "./Airline"
import FlightNumber from "./FlightNumber"
import DepTime from "./DepTime"
import Destination from "./Destination"
import TerminalGate from "./TerminalGate"
import TopBar from "./TopBar"


export interface FlightDataItemsType {
    codeShareNr?: string
    airline: string[][]
     flightNr: string[][]
     destination?:string
     depTime: string
     actualDep?: string
     estimatedDep?: string | null
     terminal?: string
     gate: string
}

export interface FlightDataType {
    data: FlightDataItemsType[]
}


const FlightDataTable = (props: FlightDataType) => {
        let elem = document.getElementById('TableItem')
        let parent = elem?.parentElement?.offsetHeight
        let correctHeight = parent !== undefined ? `${parent/8}px` : '100px'

    

     const rows = props.data.map((item: any, index:any) => {
        return (
            <div key={index} style={{height: correctHeight}} id='TableItem' className='FlightDataTable w-full flex my-2'>
                <div className='w-[20%] h-full flex items-center justify-center'>
                 <DepTime depTime={item.depTime} estTime={item.estimatedDep}/>
                </div>
                <div className='w-[25%] h-full overflow-hidden'>
                <Airline airline={item.airline[0]}/>
                </div>
                <div className='w-[40%] h-full flex flex-col items-start justify-center overflow-hidden'>
                <Destination destination={item.destination}/>
                <div className='justify-self-end'>
                    <FlightNumber flightNumber={item.flightNr[0]}/>
                </div>
                </div>
                <div className='w-[15%] h-full flex items-center justify-center'>
                <TerminalGate gate={item.gate} terminal={item.terminal}/>
                </div>
            </div>
        )
    }) 

    return (
        <div className='w-full h-full'>
            <div className='h-10 w-5/6 m-auto flex items-center justify-center'>
                <TopBar direction='departures' date="2.5.2022"/>
            </div>
        <div className='h-full w-5/6 m-auto border border-indigo-600'>
            {rows} 

        </div>
        </div>
    )
}
export default FlightDataTable
