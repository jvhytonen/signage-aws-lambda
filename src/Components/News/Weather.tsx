interface WeatherItemsType {
    temp: number
    icon: string
    description: string
}

export interface WeatherComponentType {
    currentCond: WeatherItemsType
    tomorrow: WeatherItemsType
    location: string
}

// URL to the AWS S3 bucket where the icons are. 
const ICONURL = 'https://signage-weather-icons.s3.eu-north-1.amazonaws.com/'

const Weather = (props: WeatherComponentType) => {
    const iconCurrent = ICONURL + props.currentCond.icon + '.svg'
    const iconTomorrow = ICONURL + props.tomorrow.icon + '.svg'
    return (
        <div className='w-full h-full Weather rounded'>
            <div className='w-full h-[20%] text-center text-4xl'>
                <p>Weather in</p>
                <p>{props.location}</p>
            </div>
            <div className='w-full h-[40%]'>
                <p className='text-3xl text-center'>Current:</p>
                <div className='w-full h-[90%] flex items-center justify-around'>
                    <img src={iconCurrent} alt='' width='30%' height='30%' />
                    <p className='text-4xl'>{props.currentCond.temp} &#8451;</p>
                </div>
            </div>
            <div className='w.full h-[40%]'>
                <p className='text-3xl text-center'>Tomorrow: </p>
                <div className='w-full h-[90%] flex items-center justify-around'>
                    <img src={iconTomorrow} alt='' width='30%' height='30%' />
                    <p className='text-4xl'>{props.tomorrow.temp} &#8451;</p>
                </div>
            </div>
        </div>
    )
}

export default Weather