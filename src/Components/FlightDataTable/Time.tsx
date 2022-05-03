interface DepTimeType {
    originalTime: string
    estTime?: string | null | undefined
}
const Time = (props: DepTimeType) => {
    return (
        <div className='h-full w-full flex items-center justify-around px-4'>
            <p className={`w-1/2 ${props.estTime !== null ? ' ' : ' line-through'}`}>{props.originalTime}</p>
            <p className='w-1/2 text-red-600'>{props.estTime}</p>      
        </div>
    )
}
export default Time 
