interface AirlineType {
    airline: string
}

const Airline = (props: AirlineType) => {
    return (
        <p>{props.airline}</p>
    )
}
export default Airline