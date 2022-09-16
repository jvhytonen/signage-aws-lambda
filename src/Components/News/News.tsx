
export interface NewsType {
    author: string
    title: string
    description: string
    urlToImage: string
    publishedAt: string
}


const News = (props: NewsType) => {
    return (
        <div className='w-full h-full flex flex-col justify-between'>
            <div className='w-full'>
                <img src={props.urlToImage} alt='' />
            </div>
            <div className='w-full pt-3 px-3'>
                <p className='text-2xl uppercase'>{props.title}</p>
                <p className='text-xl'>{props.description}</p>
            </div>
        </div>
    )
}
export default News
