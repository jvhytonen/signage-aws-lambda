import AdCard from "./AdCard"
import InfoCard, { InfoCardType } from "./InfoCard"

export interface InformationType {
    info: AdsInfoType[]
}

export interface AdsInfoType {
    type: string
    data: {
        heading?: string
        text?: string
        bgColor?: string
        url?: string
    }
}

const AdsInfo = (props: InformationType) => {
    let currentIndex = 3



    return (
        <div className='w-full max-h-full'>
            {props.info[currentIndex].type === 'info' ?
                <InfoCard
                    heading={props.info[currentIndex].data.heading}
                    text={props.info[currentIndex].data.text}
                    bgColor={props.info[currentIndex].data.bgColor} /> :
                <AdCard url={props.info[currentIndex].data.url} />}
        </div>
    )
}
export default AdsInfo