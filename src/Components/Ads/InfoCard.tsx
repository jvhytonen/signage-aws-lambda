import parse from 'html-react-parser';

export interface InfoCardType {
    infoData: string | undefined
}

const content = `<div className='h-full w-full flex flex-col justify-around items-center text-3xl'><h2 className='text-5xl mb-5'>Shuttle bus to the Airport</h2><p className='my-3'>Travel time ca. 6 mins</p><p className='my-3'>Visits terminal 1 and 2 </p><h2>Mon - Sun 6am - 10pm</h2><ul><li>Every half hour  </li></ul><h2>Nightime</h2><ul><li>Only on upon request </li><li>Call +45354 234234234</li>`
const content2 = `<h2 className='text-5xl mb-5 text-center'>Shuttle bus to the Airport</h2><div className='h-full w-full flex justify-around items-start text-3xl'><div className='w-1/2 h-full'><ul className='ml-3 flex flex-col justify-center'><li className='my-3'>Travel time hotel-airport: 6 min</li><li className='my-3'>Visits terminal 1 and 2 </li></ul></div><div className='w-1/2 h-full'><ul className='ml-3'><li className='font-bold mb-2'>Mon - Sun 6am - 10pm</li><li className='mb-2'>Every half hour</li><li className='font-bold mb-2'>Nighttime (10pm - 6am)</li><li className='mb-2'>Only on upon request </li><li className='mb-2'>Call +45354 234234234</li></ul></div></div>`
const InfoCard = (props: InfoCardType) => {
    return (
        <div className='w-full h-full'>
            {/* <h1 className='text-5xl text-center'>{props.heading}</h1> */}
            {/* <p className='text-center text-xl'>{props.text}</p> */}
            {/* {parse(content)} */}
            {props.infoData ? parse(props.infoData) : null}
        </div>
            )
}
            export default InfoCard