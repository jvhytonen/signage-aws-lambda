
interface LeftTopType {
    direction: string
}

const TopBarLeft = (props: LeftTopType) => {
    return (
       <div className='h-full w-full items-center flex justify-center'>
           <p className='text-4xl'>{props.direction}</p>
       </div>
    )
}
export default TopBarLeft