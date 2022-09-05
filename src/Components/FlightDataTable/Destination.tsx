interface DestinationType {
    destination: string
}

const Destination = (props: DestinationType) => {
    return (
        <p>{props.destination}</p>
    )
}
export default Destination