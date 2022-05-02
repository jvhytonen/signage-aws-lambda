interface AirlineType {
    airline: string[]
}

const Airline = (props: AirlineType) => {

    return (
        <div className='h-full w-full flex flex-col justify-center'>
            {props.airline.map((arl, ind) => {
                return (
                    <p key={ind}>{arl}</p>
                )
            })}
        </div>
    )
}
export default Airline