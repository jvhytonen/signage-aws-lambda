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

// For test purposes:-----------------------------------------------

const schedules = [
    {scheduledDeparture: 55320, headsign: "Helsinki via Tikkurila"},
    {scheduledDeparture: 55440, headsign: "Helsinki via Huopalahti"},
    {scheduledDeparture: 55920, headsign: "Helsinki via Tikkurila"},
    {scheduledDeparture: 56040, headsign: "Helsinki via Huopalahti"},
    {scheduledDeparture: 56520, headsign: "Helsinki via Tikkurila"},
]

const newsArr = [
    {
    author: "BBC News",
    title: 	"Cholera in Mariupol: Ruined city at risk of major cholera outbreak - UK",
    description: "Conditions in the ruined Ukrainian city, now in Russian hands, could lead to a resurgence of the disease.",
    urlToImage: "https://ichef.bbci.co.uk/news/1024/branded_news/A3ED/production/_125356914_mariupolambulance.jpg",
    publishedAt: "2022-06-10T18:07:17.7576592Z",
 },
 {
    author: "BBC News",
    title: 	"Flight to remove asylum seekers from UK to Rwanda allowed by court",
    description: "Campaigners failed in their High Court bid to halt the removal which is planned for Tuesday.",
    urlToImage: "https://ichef.bbci.co.uk/news/1024/branded_news/83B3/production/_115651733_breaking-large-promo-nc.png",
    publishedAt: "2022-06-10T17:52:21.1166224Z",
 },
 {
    author: "BBC News",
    title: 	"Russia's new version of McDonald's unveils logo",
    description: "It comes as the fast food chain is due to reopen 15 of the rebranded restaurants this weekend.",
    urlToImage: "https://ichef.bbci.co.uk/news/1024/branded_news/D394/production/_125346145_hi076599836.jpg",
    publishedAt: "2022-06-10T16:52:22.3993343Z",
 }
]

// For test purposes end---------------------------------------------------------

const FlightDataTable = (props: FlightDataType) => {
 
    return (
        <div className='w-full h-screen'>
            <div className='h-[8%] w-full m-auto items-center justify-center bg-sky-800 shadow-md'>
                <TopBar direction='Departures' date="10.25" publicTransport={props.data.body.publicTransport} />
            </div>
            <div className='h-full w-full flex shadow-md'>
                <div className='w-1/2 h-full relative justify-around border bg-gradient-to-b from-blue-500 to-cyan-500'>
                    <div className='h-full w-[95%] m-auto overflow-y-auto Table'>
                        {props.data === undefined ? <h1>No data</h1> : <Departures data={props.data.body.departures} />}
                        {/* {props.data === undefined ? <h1>No data</h1> : <Arrivals data={props.data.arrivals} />} */}
                    </div>
                </div>
                <div className='w-1/2 h-full flex flex-col justify-around items-center'>
                    <div className='h-[45%] w-[90%] shadow-lg'>
                        <div className='w-full h-full flex'>
                            <NewsContainer news={props.data.body.news} />
                        </div>
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
