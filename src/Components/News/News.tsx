
export interface NewsType {
    title: string
    description: string
    urlToImage: string
}


const News = (props: NewsType) => {
    return (
        <div className='w-full h-full flex flex-col'>
            <div className='w-full'>
                {/**Aria label is here for the tests. This is a way to test that img with url is shown as should. */}
                <img aria-label={props.urlToImage} src={props.urlToImage} alt='' />
            </div>
            <div className='w-full pt-3 px-3'>
                <p className='text-3xl uppercase'>{props.title}</p>
                <p className='text-2xl'>{props.description}</p>
            </div>
        </div>
    )
}
export default News
