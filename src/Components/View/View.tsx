import TopBar from "../TopBar/TopBar"
import { ScheduleItemType } from '../TopBar/TopBarRight';
import {WeatherComponentType} from '../News/Weather'
import {NewsType} from '../News/News'
import NewsContainer from '../News/NewsContainer';
import AdsInfo, { AdsInfoType } from '../Ads/AdsInfo'
import FlightData from '../FlightData/FlightData';
import {TimeTableType} from '../FlightData/TimeTable'
import Error from "../UI/Error";

export interface AppType {
    body: {
        flights: TimeTableType[]
        news?: NewsType[]
        publicTransport: ScheduleItemType[]
        weather: WeatherComponentType
        adsInfo?: AdsInfoType[]
    }
}
export interface ViewType {
    data: AppType
}

const View = (props: ViewType) => {
 
    return (
        <div className='w-full h-full'>
            <div className='h-[8%] w-full items-center justify-center shadow-md Topbar'>
                {props.data.body.publicTransport === undefined ? <h1>No data</h1> : <TopBar publicTransport={props.data.body.publicTransport} />}
            </div>
            <div className='h-[92%] w-full flex shadow-md'>
                <div className='w-1/2 h-full relative justify-around Lefthalf text-white'>
                    <div className='h-full w-full m-auto Timetable'>
                        {props.data.body.flights === undefined ? <Error message={"No data"}/> : <FlightData flights={props.data.body.flights} />}
                    </div>
                </div>
                <div className='w-1/2 h-full flex flex-col justify-around items-center Righthalf'>
                    <div className='h-[55%] w-[95%] shadow-lg flex my-5'>
                            <NewsContainer news={props.data.body.news} weather={props.data.body.weather}/>
                    </div>
                    <div className='h-[40%] w-[95%] flex justify-center items-center shadow-lg mt-5'>
                        {props.data.body.adsInfo ? <AdsInfo info={props.data.body.adsInfo}/> : <Error message={"No data"}/>}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default View
