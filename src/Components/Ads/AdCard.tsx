
export interface AdCardType {
    url: string | undefined
}

const AdCard = (props: AdCardType) => {
    return (
        <div className='max-h-full max-w-full overflow-hidden'>
            <img src={props.url} alt='' width='100%' height='100%' />
        </div>
    )
}
export default AdCard