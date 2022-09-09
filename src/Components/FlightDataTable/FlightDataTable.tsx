import animateScrollTo from 'animated-scroll-to';
import React, { useEffect, useRef, useState } from "react"
import Departures, { DepDataItems } from './Departures'
import TopBar from "../TopBar/TopBar"
import { ScheduleItemType } from '../TopBar/TopBarRight';
import Arrivals, { ArrDataItemsType } from "./Arrivals"
import {NewsType} from '../News/News'
import NewsContainer from '../News/NewsContainer';
import Ads from '../Ads/Ads'

export interface AppType {
    body: {
        departures: DepDataItems[][]
        arrivals: ArrDataItemsType[]
        news: NewsType[]
        publicTransport: ScheduleItemType[]
    }
}
export interface FlightDataType {
    data: AppType
}

const FlightDataTable = (props: FlightDataType) => {
 
    return (
        <div className='w-full h-full'>
            <div className='h-[8%] w-full m-auto items-center justify-center bg-sky-800 shadow-md'>
                <TopBar direction='Departures' date="10.25" publicTransport={props.data.body.publicTransport} />
            </div>
            <div className='h-[92%] w-full flex shadow-md'>
                <div className='w-1/2 h-full relative justify-around border bg-gradient-to-b from-blue-500 to-cyan-500'>
                    <div className='h-full w-[95%] m-auto Table'>
                        {props.data === undefined ? <h1>No data</h1> : <Departures data={props.data.body.departures} />}
                        {/* {props.data === undefined ? <h1>No data</h1> : <Arrivals data={props.data.arrivals} />} */}
                    </div>
                </div>
                <div className='w-1/2 h-full flex flex-col justify-around items-center'>
                    <div className='h-full w-[90%] shadow-lg flex my-5'>
                            <NewsContainer news={props.data.body.news} />
                    </div>
                    <div className='h-full w-[90%] shadow-lg my-5'>
                        <Ads adItems='Some Ads here'/>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default FlightDataTable
