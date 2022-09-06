import TopBarRight, {ScheduleItemType} from './TopBarRight'
import TopBarLeft from './TopBarLeft'

interface TopBarType {
    direction: string
    date: string
    publicTransport: ScheduleItemType[]
}

const TopBar = (props: TopBarType) => {
  
    return (
        <div className='w-full h-full flex items-center justify-center text-white font-bold'>
            <div className='w-1/2 h-full flex items-center justify-around'>
                <TopBarLeft direction={props.direction} date={props.date}/>
            </div>
            <div className='w-1/2 h-full flex items-center justify-center text-3xl'>
                <TopBarRight publicTransport={props.publicTransport}/>
            </div>
        </div>
    )
}
export default TopBar