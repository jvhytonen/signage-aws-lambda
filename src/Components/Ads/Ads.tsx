interface AdsType {
    adItems: string
}

const Ads = (props: AdsType) => {
    return (
        <div className='w-full h-full'>
            <p>{props.adItems}</p>
        </div>
    )
}
export default Ads