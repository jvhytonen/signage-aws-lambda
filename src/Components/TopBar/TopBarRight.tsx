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
    // This animation will make sure the whole animation is finished before showing the next animation. 
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
        // This scrolls text showing next trains.
        const children = div.current?.children
        // If there is only one timetable to show, no scrolling is needed. Only make the only train visible.
        if (children?.length === 1) {
            children[0].classList.remove('hidden')
        }
        // If we have more than 1 timetable, they are scrolled with animation. 
        else if (children !== undefined && index < children.length) {
           const current = children[index]
           const prev = index === 0 ? children[children.length - 1] : children[index - 1]
            if (prev.classList.contains('block')) {
                // The outgoing element is animated in a separate function.
               await makeAnimation(prev, 'animate__fadeOutDown')
               // When animation is finished, the animating class is removed so that we can add it again when its next turn comes.
               prev.classList.remove('animate__fadeOutDown')
               // And we make it invisible.
               prev.classList.replace('block', 'hidden')
            }
            // Then the incoming animation is made visible and animated. 
            if (current.classList.contains('hidden')) {
                current.classList.replace('hidden', 'block')
                await makeAnimation(current, 'animate__fadeInDown')
            }
            // The next one will be animated by adding 1 to index. When the last train in the array is shown, we'll start again from 0.
            if (index >= children.length - 1){
                index = 0
            } else {
                index = index + 1
            }
            // Clearing the old timeout before adding new. 
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