interface FlightNumberType {
    flightNumber: string[]
}

const FlightNumber = (props: FlightNumberType) => {
    console.log(props.flightNumber)
    return (
        <ul className='w-full h-full flex'>
         {props.flightNumber.map((nr, ind) => {
            return(
                <li key={ind} className='mr-2'>{nr}</li>
            )
        })} 
        </ul>
    )
}
export default FlightNumber