import React, {useEffect, useRef} from "react"
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
    const timeDiv = useRef<HTMLDivElement | null>(null)
    let elem = document.getElementById('TableItem')
    let parent = elem?.parentElement?.offsetHeight
    let correctHeight = parent !== undefined ? `${parent / 8}px` : '100px'

    const scrollSomething = async (ind:number) => {
        const children = timeDiv.current?.children
        if (children !== undefined) {
            await children[ind].scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"})
            ind = ind + 1
            setTimeout(() => scrollSomething(ind), 1000 )
        }
        else {
            return
        }
    }

    useEffect(() => {
       // scrollSomething(0)
    }, [])

    return (
        <div className='w-full h-screen overflow-hidden'>
            <div className='w-1/2 h-full justify-around border border-red-300'>
                <div className='h-[5%] w-full m-auto flex items-center justify-center'>
                    <TopBar direction='departures' date="2.5.2022" />
                </div>
                <div ref={timeDiv} className='h-[95%] w-[95%] m-auto border border-indigo-600'>
                    {props.data === undefined ? <h1>No data</h1> : <Departures data={props.data.departures} />}
                    {/* {props.data === undefined ? <h1>No data</h1> : <Arrivals data={props.data.arrivals} />} */}
                </div>
            </div>
            <div className='w-1/2 h-full'>
                <h1>Another half</h1>
            </div>
        </div>
    )
}
export default FlightDataTable
