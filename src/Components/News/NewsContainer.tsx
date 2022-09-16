import News, { NewsType } from "./News";
import Weather, {WeatherComponentType} from "./Weather";
import { useEffect, useState } from 'react'

interface NewsArrType {
    news: NewsType[]
    weather: WeatherComponentType
}

const NewsContainer = (props: NewsArrType) => {
    const [currentInd, setCurrentInd] = useState(0)
    useEffect(() => {
        if (props.news) {
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
        <div className='w-full min-h-full flex justify-between rounded News'>
            <div className='w-[63%] min-h-full bg-gradient-to-b from-red-800 to-red-500 text-white'>
                <News
                    author={props.news[currentInd].author}
                    title={props.news[currentInd].title}
                    description={props.news[currentInd].description}
                    urlToImage={props.news[currentInd].urlToImage}
                    publishedAt={props.news[currentInd].publishedAt} />
            </div>
            <div className='w-[33%] h-full'>
                <Weather {...props.weather} />
            </div>
        </div>
    )
}

export default NewsContainer
