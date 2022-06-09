import animateScrollTo from 'animated-scroll-to';
import React, { useEffect, useRef } from "react"
import Departures, { DepDataItems } from './Departures'
import TopBar from "../TopBar/TopBar"
import Arrivals, { ArrDataItemsType } from "./Arrivals"
import News from "../News/News";
import Ads from '../Ads/Ads'

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

    const startScrolling = async () => {
        const children = timeDiv.current?.children
        const tableElem = document.querySelector(".Table")
        if (children !== undefined) {
            const lastElem = children[children?.length - 1]
            //  For some reason TypeScript compiler won't accept the Table element to be scroller (elementToScroll) 
            // even this is be made according to documentation in animateScrollTo -dokumentation. Hence the ignore.
            // @ts-ignore
            await animateScrollTo(lastElem, {
                elementToScroll: tableElem,
                cancelOnUserAction: false,
                // minDuration: (children.length * 3000),
                speed: 3500
            })
        }
        else {
            return
        }
    }

    useEffect(() => {
        startScrolling()
    }, [])

    return (
        <div className='w-full h-screen'>
            <div className='h-[8%] w-full m-auto items-center justify-center bg-sky-800 shadow-md'>
                <TopBar direction='Departures' date="10.25" publicTransport='Public Transport' />
            </div>
            <div className='h-[85%] w-full flex shadow-md'>
                <div className='w-1/2 h-full relative justify-around border bg-gradient-to-b from-blue-500 to-cyan-500'>
                    <div ref={timeDiv} className='h-full w-[95%] m-auto overflow-y-auto Table'>
                        {props.data === undefined ? <h1>No data</h1> : <Departures data={props.data.departures} />}
                        {/* {props.data === undefined ? <h1>No data</h1> : <Arrivals data={props.data.arrivals} />} */}
                    </div>
                </div>
                <div className='w-1/2 h-full flex flex-col justify-center items-center justify-around'>
                    <div className='h-[45%] w-[90%] shadow-lg'>
                        <News newsItems='Here will be news' />
                    </div>
                    <div className='h-[45%] w-[90%] shadow-lg'>
                        <Ads adItems='Some Ads here'/>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default FlightDataTable
