import News from './News'

interface NewsType {
    newsItems: NewsItemsType[]
}

interface NewsItemsType {
    author: string
    title: string
    description: string
    urlToImage: string
    publishedAt: string
}


const NewsContainer = (props: NewsType) => {
    const index = 2
    return (
        <>
        <div className='w-full h-[80%]'>
          <News 
          author={props.newsItems[index].author} 
          title={props.newsItems[index].title} 
          description={props.newsItems[index].description}
          urlToImage={props.newsItems[index].urlToImage}
          published={props.newsItems[index].publishedAt}/>
        </div>
        <div className='w-full h-[20%]'>
            <p>Jeremy Weatherspoon</p>
        </div>
        </>
    )
}
export default NewsContainer