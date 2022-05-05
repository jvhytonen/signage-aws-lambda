import animateScrollTo from 'animated-scroll-to';
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
        <div className='w-full h-screen flex'>
            <div className='w-1/2 h-full relative justify-around border border-red-300'>
                <div className='h-[5%] w-full m-auto flex items-center justify-center'>
                    <TopBar direction='departures' date="2.5.2022" />
                </div>
                <div ref={timeDiv} className='h-[95%] w-[95%] m-auto overflow-y-auto Table'>
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
