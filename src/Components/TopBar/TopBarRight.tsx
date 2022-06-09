interface RightTopType {
    publicTransport: string
}


const TopBarRight = (props: RightTopType) => {
    return (
       <div>
           <p>{props.publicTransport}</p>
       </div>
    )
}
export default TopBarRight