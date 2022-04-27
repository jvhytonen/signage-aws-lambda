interface FlightNumberType {
    flightNumber: string
}

const FlightNumber = (props: FlightNumberType) => {
    return (
        <p>{props.flightNumber}</p>
    )
}
export default FlightNumber