import 'animate.css';
import { useEffect, useRef } from 'react'

interface SchedulesType {
    publicTransport: ScheduleItemType[]
}

export interface ScheduleItemType {
    scheduledDeparture: string
    headsign: string
}
type scrollerType = (index: number) => void


const makeAnimation = (el: Element, animation: string) => {
    return new Promise<void>( resolve => {
        const onEnd = () => {
            el.removeEventListener('animationend', onEnd)
            resolve()
        }
        el.addEventListener('animationend', onEnd)
        el.classList.add(animation)
    })
}

const TopBarRight = (props: SchedulesType) => {
    const div = useRef<HTMLDivElement | null>(null)
    let timer:number

    const scroller: scrollerType = async (index: number) => {
        const children = div.current?.children
        if (children !== undefined && index < children.length) {
           const current = children[index]
           const prev = index === 0 ? children[children.length - 1] : children[index - 1]
            if (prev.classList.contains('block')) {
               await makeAnimation(prev, 'animate__fadeOutDown')
               prev.classList.remove('animate__fadeOutDown')
               prev.classList.replace('block', 'hidden')
            }
            if (current.classList.contains('hidden')) {
                current.classList.replace('hidden', 'block')
                await makeAnimation(current, 'animate__fadeInDown')
            }
            if (index >= children.length - 1){
                index = 0
            } else {
                index = index + 1
            }
            window.clearTimeout(timer)
            timer = window.setTimeout(() => scroller(index), 3000)
        }
        else {
            return
        }
    }

  useEffect(() => {
        scroller(0)
        return () => {
            window.clearTimeout(timer)
        }
    })

    return (
        <div ref={div} className='flex w-1/2 flex-col'>
            {props.publicTransport.map((item, ind) => {
                return <p key={ind} className='h-full animate__animated hidden ml-2'>{item.headsign} {item.scheduledDeparture}</p>
            })
            }
        </div>
    )
}
export default TopBarRight