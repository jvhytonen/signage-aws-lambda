export interface WeatherType {
    location: string
    temperature: number
    weatherType: string
}


const Weather = (props: WeatherType) => {
    return (
        <div className='w-full h-full'>
            <div className='w-full h-1/6 text-center text-3xl'>
                <p>Weather in</p>
                <p>{props.location}</p>
            </div>
            <div className='w-full h-5/6 py-2 flex flex-col items-center justify-between'>
                <p className='text-2xl'>Today:</p>
                <p>{props.temperature} - {props.weatherType} </p>
                <p className='text-2xl'>Tomorrow: </p>
                <p>{props.temperature} - {props.weatherType} </p>
            </div>
        </div>
    )
}

export default Weather