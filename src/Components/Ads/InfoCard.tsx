import parse from 'html-react-parser';

export interface InfoCardType {
    heading: string | undefined
    text: string | undefined
    bgColor: string | undefined
}

const content = `<h2 className='text-5xl'>Breakfast</h2><p>Mon - Fri 6am - 10am<br>Sat - Sun 7am - 10am</p><p>Restaurant Lounge Club (1st floor)</p>`

const InfoCard = (props: InfoCardType) => {
    return (
        <div className='w-full h-full'>
            <h1 className='text-5xl text-center'>{props.heading}</h1>
            {/* <p className='text-center text-xl'>{props.text}</p> */}
            {parse(content)}
        </div>
    )
}
export default InfoCard