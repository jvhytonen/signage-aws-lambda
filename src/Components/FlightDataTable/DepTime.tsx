interface DepTimeType {
    depTime: string
    estTime: string
}
const DepTime = (props: DepTimeType) => {
    return (
        <div className='h-full w-full flex items-center justify-around px-4'>
            <p className={`w-1/2 ${props.estTime.length > 1 ? 'line-through' : ' '}`}>{props.depTime}</p>
            <p className='w-1/2 text-red-600'>{props.estTime}</p>      
        </div>
    )
}
export default DepTime 