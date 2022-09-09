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

const TopBarRight = (props: SchedulesType) => {
    const div = useRef<HTMLDivElement | null>(null)
    let timer:number

    const scroller: scrollerType = async (index: number) => {
        const children = div.current?.children
        if (children !== undefined && index < children.length) {
            const current = children[index]
           // const prev = index === 0 ? children[children.length - 1] : children[index - 1]
           const next = index >= (children.length - 1) ? children[0] : children[index + 1]
          // const next = children[index+1]
            if (current.classList.contains('hidden')) {
                current.classList.replace('hidden', 'block')
            }
            await current.classList.add('hidden')
            await next.classList.replace('hidden', 'block')
            if (index >= children.length - 1){
                index = 0
            } else {
                index = index + 1
            }
          //  window.clearTimeout(timer)
            timer = window.setTimeout(() => scroller(index), 3000)
        }
    }

    useEffect(() => {
        scroller(0)
        return () => {
            window.clearTimeout(timer)
        }
    })

    return (
        <div ref={div} className='flex flex-col'>
            {props.publicTransport.map((item, ind) => {
                return <p key={ind} className='hidden h-full animate__animated'>{item.headsign} {item.scheduledDeparture}</p>
            })
            }
        </div>
    )
}
export default TopBarRight