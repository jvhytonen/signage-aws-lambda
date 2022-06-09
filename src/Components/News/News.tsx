interface NewsType {
    newsItems: string
}

const FlightNumber = (props: NewsType) => {
    return (
        <div className='w-full h-full'>
            <p>{props.newsItems}</p>
        </div>
    )
}
export default FlightNumber