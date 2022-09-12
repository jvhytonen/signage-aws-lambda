import animateScrollTo from 'animated-scroll-to';
import React, { useEffect, useRef, useState } from "react"
import TopBar from "../TopBar/TopBar"
import { ScheduleItemType } from '../TopBar/TopBarRight';
import { DepDataItemsType, ArrDataItemsType } from '../FlightData/TimeTable';
import {NewsType} from '../News/News'
import NewsContainer from '../News/NewsContainer';
import Ads from '../Ads/Ads'
import FlightData from '../FlightData/FlightData';

export interface AppType {
    body: {
        departures: DepDataItemsType[][]
        arrivals: ArrDataItemsType[][]
        news: NewsType[]
        publicTransport: ScheduleItemType[]
    }
}
export interface ViewType {
    data: AppType
}

const View = (props: ViewType) => {
 
    return (
        <div className='w-full h-full'>
            <div className='h-[8%] w-full items-center justify-center shadow-md Topbar'>
                <TopBar publicTransport={props.data.body.publicTransport} />
            </div>
            <div className='h-[92%] w-full flex shadow-md'>
                <div className='w-1/2 h-full relative justify-around Lefthalf text-white'>
                    <div className='h-full w-full m-auto Timetable'>
                        {props.data === undefined ? <h1>No data</h1> : <FlightData departures={props.data.body.departures} arrivals={props.data.body.arrivals} />}
                        {/* {props.data === undefined ? <h1>No data</h1> : <Arrivals data={props.data.arrivals} />} */}
                    </div>
                </div>
                <div className='w-1/2 h-full flex flex-col justify-around items-center Righthalf'>
                    <div className='h-full w-[93%] shadow-lg flex my-5'>
                            <NewsContainer news={props.data.body.news} />
                    </div>
                    <div className='h-full w-[93%] shadow-lg my-5'>
                        <Ads adItems='Some Ads here'/>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default View
