import parse from 'html-react-parser';

export interface InfoCardType {
    infoData: string | undefined
}

const InfoCard = (props: InfoCardType) => {
    return (
        <div className='w-full h-full'>
            {props.infoData ? parse(props.infoData) : null}
        </div>
    )
}
export default InfoCard