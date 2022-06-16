
interface NewsType {
    author: string
    title: string
    description: string
    urlToImage: string
    published: string
}


const News = (props: NewsType) => {
    return (
        <div className='w-full h-full flex justify-around items-center'>
            <div className='w-[45%] h-[90%]'>
            <img src={props.urlToImage} alt=''/> 
            <p>{props.published}</p>
            </div>
            <div className='w-[45%] h-[90%]'>
                <h1>{props.title}</h1>
                <p>{props.author}</p>
                <p>{props.description}</p>
            </div>
        </div>
    )
}
export default News