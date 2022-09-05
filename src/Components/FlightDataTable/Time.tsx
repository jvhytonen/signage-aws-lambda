interface TimeType {
    originalTime: string
    estTime?: string | null | undefined
    actualTime: string | null | undefined
    type: string
}
const Time = (props: TimeType) => {
    let isDeparted = props.actualTime === null ? false : true
    let isEstimated = props.estTime === null ? false : true
    let timeColor:string
    let detailText: string
    if (isDeparted) {
        timeColor = 'text-green-600'
        detailText = props.type === 'departures' ? 'Departed ' : 'Landed '
    }
    else if (isEstimated) {
        timeColor = 'text-amber-400'
        detailText = 'Est '
    }
    else {
        timeColor = ''
        detailText = ''
    }
    const renderType = (type: string) => {

        switch (type) {
            case 'departures':
                return (
                    <div className='w-full h-full max-h-full flex items-start justify-around py-4'>
                        <p className='w-[40%]'>{props.originalTime}</p>
                        <p className={`w-[60%] ${timeColor}`}>{detailText}{props.estTime}</p>
                    </div>
                )
            case 'arrivals':
                return (
                    <div className='w-full h-full max-h-full flex items-start justify-around py-4'>
                        <p className={`w-[40%] ${(props.estTime !== null && props.actualTime !== null) ? ' ' : ' line-through'}`}>{props.originalTime}</p>
                        <p className={`w-[60%]${timeColor}`}>{props.estTime}</p>
                    </div>
                )
        }
    }
    return (
        <div className='h-full w-full flex items-center justify-around px-4 text-xl'>
            {renderType(props.type)}
        </div>
    )
}
export default Time 
