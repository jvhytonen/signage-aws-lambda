
export interface NewsType {
    author: string
    title: string
    description: string
    urlToImage: string
    publishedAt: string
}


const News = (props: NewsType) => {
    return (
        <div className='w-full h-full'>
            <div className='w-1/2 h-full bg-blue-300'>
            <img src={props.urlToImage} alt=''/>
            <div className='w-full max-h-full flex items-center'>
                <p>{props.author}</p>
                <p>{props.publishedAt}</p>
            </div>
            </div>
        </div>
    )
}
export default News
/* 
<div className='w-1/2 h-1/2 bg-red-600'>
/* <img src={props.urlToImage} alt=''/> *
/* </div>
<div className='w-full h-1/2 bg-yellow-600'>
    <h1>{props.title}</h1>
    <p>{props.author}</p>
    <p>{props.description}</p>
</div> */