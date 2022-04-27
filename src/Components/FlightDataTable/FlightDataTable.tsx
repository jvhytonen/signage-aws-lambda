import React from "react"
import Airline from "./Airline"
import FlightNumber from "./FlightNumber"
import DepTime from "./DepTime"
import Destination from "./Destination"
import TerminalGate from "./TerminalGate"


export interface FlightDataItemsType {
    codeShareNr?: string
    airline: string[]
     flightNr: string[]
     destination?:string
     depTime: string
     actualDep?: string
     estimatedDep?: string
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
                <div className='w-1/5 h-full flex items-center justify-center'>
                 <DepTime time={item.depTime}/>
                </div>
                <div className='w-1/5 h-full'>
                <Airline airline={item.airline}/>
                </div>
                <div className='grow h-full'>
                <Destination destination={item.destination}/>
                <FlightNumber flightNumber={item.flightNr}/>
                </div>
                <div className='w-1/5 h-full'>
                <TerminalGate gate={item.gate} terminal={item.terminal}/>
                </div>
            </div>
        )
    }) 

    return (
        <div className='h-screen w-5/6 m-auto border-2'>
            {rows} 

        </div>
    )
}
export default FlightDataTable
