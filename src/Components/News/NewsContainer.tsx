import News, {NewsType} from "./News";
import { useEffect, useState } from 'react'

interface NewsArrType {
    news: NewsType[]
}


const NewsContainer = (props: NewsArrType) => {
    const [currentInd, setCurrentInd] = useState(0)

    useEffect(() => {
        if(props.news) {
            const timer = setTimeout(() => {
                if (currentInd + 1 < props.news.length) {
                    setCurrentInd(currentInd + 1)
                }
                else {
                    setCurrentInd(0)
                }
            }, 15000)
            return () => clearTimeout(timer)
        }
    }, [currentInd, props.news])

    return (
        <News 
        author={props.news[currentInd].author}
        title={props.news[currentInd].title}
        description={props.news[currentInd].description}
        urlToImage={props.news[currentInd].urlToImage}
        publishedAt={props.news[currentInd].publishedAt} />
    )
}

export default NewsContainer