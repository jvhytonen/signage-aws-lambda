import { useRef } from 'react'
import Airline from "./Airline"
import FlightNumber from "./FlightNumber"
import Time from "./Time"
import Destination from "./Destination"


export interface DepDataItemsType {
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

export interface ArrDataItemsType {
    codeShareNr?: string
    airline: string
    flightNr: string[][]
    depDestination: string
    arrTime: string
    actualArr?: string
    estimatedArr?: string | null
    terminal?: string
    baggage?: string
}

export interface FlightDataType {
    data: DepDataItemsType[][]
}

const TimeTable = (props: FlightDataType) => {
    // Ref is used to get the height of the timetable area so that we can adjust the correct height for one flightitem:
    // In other words: we divide the whole height by amount of flights shown on one page.
    const div = useRef<HTMLDivElement | null>(null)
    let itemHeight = (1 / props.data[0].length) * 100
    let heightClass = itemHeight + '%'

    let rows
    rows = props.data[0].map((item: DepDataItemsType, index: number) => {
        return (
            <div ref={div} key={index} style={{height: `${heightClass}`}} className={'FlightDataTable w-full flex h-[6%] text-3xl'}>
                <div className='w-[36%] h-full flex items-center justify-center'>
                    <Time originalTime={item.depTime} estTime={item.estimatedDep} actualTime={item.actualDep} type='departures' />
                </div>
                <div className='w-[23%] flex items-center justify-start'>
                    <Airline airline={item.airline} />
                </div>
                <div className='w-[12%] flex items-center justify-start text-3xl'>
                    <FlightNumber flightNumber={item.flightNr[0]} />
                </div>
                <div className='w-[29%] flex items-center justify-start ml-4'>
                    <Destination destination={item.destination} />
                </div>
            </div>
        )
    })

    return (
        <div className='w-full h-full'>
            <div className='h-[5%] w-full text-5xl tracking-wide flex items-center justify-center font-bold uppercase'>
                <p>Departures</p>
            </div>
            <div className='h-[95%] w-full'>
                {rows}
            </div>
        </div>
    )
}

export default TimeTable