
export interface InfoCardType {
    heading: string | undefined
    text: string | undefined
    bgColor: string | undefined
}

const InfoCard = (props: InfoCardType) => {
    return (
        <div className='w-full h-full'>
            <h1 className='text-2xl text-center'>{props.heading}</h1>
            <p className='text-center text-xl'>{props.text}</p>
        </div>
    )
}
export default InfoCard