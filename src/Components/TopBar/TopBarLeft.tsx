
interface LeftTopType {
    direction: string
    date: string
}

const TopBarLeft = (props: LeftTopType) => {
    return (
       <div className='h-full w-full items-center flex justify-center relative'>
           <p>{props.direction}</p>
           <p className='self-start text-3xl absolute top-2 right-2'>{props.date}</p>
       </div>
    )
}
export default TopBarLeft