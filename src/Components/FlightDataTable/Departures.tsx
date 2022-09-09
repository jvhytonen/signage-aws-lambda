import { useRef } from 'react'
import Airline from "./Airline"
import FlightNumber from "./FlightNumber"
import Time from "./Time"
import Destination from "./Destination"


export interface DepDataItems {
    codeShareNr?: string
    airline: string
    flightNr: string[][]
    destination: string
    depTime: string
    actualDep?: string
    estimatedDep?: string | null
    terminal?: string
    gate: string
}

export interface FlightDataType {
    data: DepDataItems[][]
}

const Departures = (props: FlightDataType) => {
    // Ref is used to get the height of the timetable area so that we can adjust the correct height for one flightitem:
    // In other words: we divide the whole height by amount of flights shown on one page.
    const div = useRef<HTMLDivElement | null>(null)
    let itemHeight = (1 / props.data[0].length) * 100
    let heightClass = itemHeight + '%'

    let rows
    rows = props.data[0].map((item: DepDataItems, index: number) => {
        return (
            <div ref={div} key={index} id='TableItem' style={{height: `${heightClass}`}} className={'FlightDataTable w-full flex text-2xl h-[6%]'}>
                <div className='w-[33%] h-full flex items-center justify-center'>
                    <Time originalTime={item.depTime} estTime={item.estimatedDep} actualTime={item.actualDep} type='departures' />
                </div>
                <div className='w-[22%] flex items-center justify-start'>
                    <Airline airline={item.airline} />
                </div>
                <div className='w-[22%] flex items-center justify-start'>
                    <FlightNumber flightNumber={item.flightNr[0]} />
                </div>
                <div className='w-[30%] flex items-center justify-start ml-4'>
                    <Destination destination={item.destination} />
                </div>
            </div>
        )
    })

    return (
        <div className='w-full h-full'>
            <div className='h-[5%] w-full text-5xl tracking-wide flex items-center justify-center'>
                <p>Departures {itemHeight}</p>
            </div>
            <div className='h-[95%] w-full'>
                {rows}
            </div>
        </div>
    )
}

export default Departures