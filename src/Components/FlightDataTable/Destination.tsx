interface DestinationType {
    destination: string
}

const Destination = (props: DestinationType) => {
    return (
        <h1>{props.destination}</h1>
    )
}
export default Destination