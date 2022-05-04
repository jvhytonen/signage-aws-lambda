
import React from "react"
import Airline from "./Airline"
import FlightNumber from "./FlightNumber"
import Time from "./Time"
import Destination from "./Destination"
import TerminalGateBG from "./TerminalGateBg"

export interface ArrDataItemsType {
    codeShareNr?: string
    airline: string[][]
    flightNr: string[][]
    depDestination: string
    arrTime: string
    actualArr?: string
    estimatedArr?: string | null
    terminal?: string
    baggage?: string
}

export interface ArrivalDataType {
    data: ArrDataItemsType[]
}

const Arrivals = (props: ArrivalDataType) => {
    console.log(props.data)
    let elem = document.getElementById('TableItem')
    let parent = elem?.parentElement?.offsetHeight
    let correctHeight = parent !== undefined ? `${parent / 8}px` : '100px'

    const rows = props.data.map((item: ArrDataItemsType, index:number) => {
        return (
            <div key={index} style={{height: correctHeight}} id='TableItem' className='FlightDataTable w-full flex my-2'>
                <div className='w-[20%] h-full flex items-center justify-center'>
                 <Time originalTime={item.arrTime} estTime={item.estimatedArr} actualTime={item.actualArr} type='arrivals'/>
                </div>
                <div className='w-[25%] h-full overflow-hidden'>
                <Airline airline={item.airline[0]}/>
                </div>
                <div className='w-[40%] h-full flex flex-col items-start justify-center overflow-hidden'>
                <Destination destination={item.depDestination}/>
                <div className='justify-self-end'>
                    <FlightNumber flightNumber={item.flightNr[0]}/>
                </div>
                </div>
                <div className='w-[15%] h-full flex items-center justify-center'>
                <TerminalGateBG gate={item.baggage} terminal={item.terminal} type='arrivals'/>
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

export default Arrivals