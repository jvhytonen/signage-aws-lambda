import TopBarRight, { ScheduleItemType } from './TopBarRight'
import TopBarLeft from './TopBarLeft'
import TopBarCenter from './TopBarCenter'

interface TopBarType {
    direction: string
    date: string
    publicTransport: ScheduleItemType[]
}

const TopBar = (props: TopBarType) => {

    return (
        <div className='w-full h-full flex items-center justify-around text-white font-bold text-3xl'>
            <div className='w-1/2 h-full flex items-center justify-around'>
                 <TopBarCenter />
            </div>
            <div className='w-1/2 h-full flex items-center justify-center'>
                <TopBarRight publicTransport={props.publicTransport} />
            </div>
        </div>
    )
}
export default TopBar