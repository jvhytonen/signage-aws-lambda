
interface LeftTopType {
    direction: string
    date: string
}

const TopBarLeft = (props: LeftTopType) => {
    return (
       <div className='h-full w-full items-center flex justify-center relative'>
           <p className='text-4xl'>{props.direction}</p>
           <p className='self-start text-4xl absolute top-[20%] right-3'>{props.date}</p>
       </div>
    )
}
export default TopBarLeft