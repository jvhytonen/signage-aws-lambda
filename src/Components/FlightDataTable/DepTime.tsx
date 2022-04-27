interface DepTimeType {
    time: string
}
const DepTime = (props: DepTimeType) => {
    return (
            <p>{props.time}</p>
    )
}
export default DepTime 