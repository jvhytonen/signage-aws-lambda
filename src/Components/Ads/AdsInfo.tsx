import AdCard from "./AdCard"
import InfoCard from "./InfoCard"

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
    // This hard-coded index. SetTimeout and setCurrrentIndex need to be added next. 
    let currentIndex = 2

    // A card with text OR an advertisement with an image will be displayed depending on what the user wants to show.   
    const renderType = (type: string) => {

        switch (type) {
            case 'info':
                return (
                    <InfoCard
                    heading={props.info[currentIndex].data.heading}
                    text={props.info[currentIndex].data.text}
                    bgColor={props.info[currentIndex].data.bgColor} />
                )
            case 'ad':
                return (
                    <AdCard url={props.info[currentIndex].data.url} />
                )
        }
    }

    return (
        <div className='w-full max-h-full'>
            {props.info && renderType(props.info[currentIndex].type)}
        </div>
    )
}
export default AdsInfo