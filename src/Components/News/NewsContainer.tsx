import News, { NewsType } from "./News";
import Weather, {WeatherComponentType} from "./Weather";
import Error from "../UI/Error";
import { useEffect, useState, useRef } from 'react'

interface NewsArrType {
    news?: NewsType[]
    weather?: WeatherComponentType
}

const NewsContainer = (props: NewsArrType) => {
    const [currentInd, setCurrentInd] = useState(0)
    const newsDiv = useRef<HTMLDivElement|null>(null)

    const makeAnimation = (el: HTMLDivElement, animation: string) => {
        //This function allows the animation to end before the code execution continues
        // In other words: the next animation is shown. 
        return new Promise<void>( resolve => {
            const onEnd = () => {
                el.removeEventListener('animationend', onEnd)
                resolve()
            }
            el.addEventListener('animationend', onEnd)
            el.classList.add(animation)
        })
    }

    useEffect(() => {
        //This will change the news into another news with fading animation. 
        if (props.news) {
            const timer = setTimeout(async () => {
                let div = newsDiv.current
                if (div !== null) {
                  await makeAnimation(div, 'animate__fadeOut')
                   div.classList.remove('animate__fadeOut')
                }
                if (props.news !== undefined && currentInd + 1 < props.news.length) {
                    setCurrentInd(currentInd + 1)
                    if (div !== null) {
                       await makeAnimation(div, 'animate__fadeIn')
                       div.classList.remove('animate__fadeOut')
                    }
                }
                else {
                    setCurrentInd(0)
                    if (div !== null) {
                        makeAnimation(div, 'animate__fadeIn')
                        div.classList.remove('animate__fadeIn')
                        
                    }
                }
            }, 15000)
            return () => clearTimeout(timer)
        }
    }, [currentInd, props.news])

    return (
        <div className='w-full min-h-full flex justify-between rounded News'>
            <div ref={newsDiv} className='w-[63%] min-h-full bg-gradient-to-b from-red-800 to-red-500 text-white animate__animated'>
               {props.news ? <News
                    title={props.news[currentInd].title}
                    description={props.news[currentInd].description}
                    urlToImage={props.news[currentInd].urlToImage}
                    /> : <Error message={"No data"}/> }
            </div>
            <div className='w-[33%] h-full'>
                {props.weather ? <Weather {...props.weather} /> : <Error message={"No data"}/>}
            </div>
        </div>
    )
}

export default NewsContainer
