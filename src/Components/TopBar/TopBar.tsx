import TopBarRight from './TopBarRight'
import TopBarLeft from './TopBarLeft'

interface TopBarType {
    direction: string
    date: string
    publicTransport: string
}

const TopBar = (props: TopBarType) => {
  
    return (
        <div className='w-full h-full flex items-center justify-center text-white text-5xl font-bold'>
            <div className='w-1/2 h-full flex items-center justify-around'>
                <TopBarLeft direction={props.direction} date={props.date}/>
            </div>
            <div className='w-1/2 h-full flex items-center justify-center'>
                <TopBarRight publicTransport='Trains here'/>
            </div>
        </div>
    )
}
export default TopBar