interface TopBarType {
    direction: string
    date: string
}

const TopBar = (props: TopBarType) => {
  
    return (
        <p>{props.direction.toUpperCase()} {props.date}</p>
    )
}
export default TopBar