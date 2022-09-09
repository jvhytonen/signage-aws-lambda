
export interface NewsType {
    author: string
    title: string
    description: string
    urlToImage: string
    publishedAt: string
}


const News = (props: NewsType) => {
    return (
        <div className='w-full h-full flex flex-col'>
            <div className='w-full h-full'>
                <img src={props.urlToImage} alt='' />
       {/*          <div className='w-full h-full flex justify-around'>
                    <p>{props.author}</p>
                    <p>{props.publishedAt}</p>
                </div> */}
            </div>
            <div className='w-full h-full flex flex-col items-center justify-center mx-3'>
                <p className='text-2xl'>{props.title}</p>
                <p className='text-xl'>{props.description}</p>
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