import AdCard from "./AdCard"
import InfoCard from "./InfoCard"

export interface InformationType {
    info: AdsInfoType[]
}

export interface AdsInfoType {
    type: string
    data: {
        infoData?: string
        url?: string
    }
}

const AdsInfo = (props: InformationType) => {
    // This hard-coded index. SetTimeout and setCurrrentIndex need to be added next. 
    let currentIndex = 0

    // A card with text OR an advertisement with an image will be displayed depending on what the user wants to show.   
    const renderType = (type: string) => {

        switch (type) {
            case 'info':
                return (
                    <InfoCard
                    infoData={props.info[currentIndex].data.infoData}
                    />
                )
            case 'ad':
                return (
                    <AdCard url={props.info[currentIndex].data.url} />
                )
        }
    }

    return (
        <div className='w-full max-h-full Info p-1'>
            {props.info ? renderType(props.info[currentIndex].type) : null}
        </div>
    )
}
export default AdsInfo