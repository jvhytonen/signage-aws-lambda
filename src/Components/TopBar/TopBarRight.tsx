import 'animate.css';
import { useEffect, useRef } from 'react'

interface RightTopType {
    publicTransport: SchedulesType[]
}

export interface SchedulesType {
    scheduledDeparture: number
    headsign: string
}

type scrollerType = (index: number) => void

const TopBarRight = (props: RightTopType) => {
    const div = useRef<HTMLDivElement | null>(null)
    const timer = useRef<number | null>(null)

    const scroller: scrollerType = async (index: number) => {
        const children = div.current?.children
        if (children !== undefined && index < children.length) {
            const current = children[index]
            const prev = index === 0 ? children[children.length - 1] : children[index - 1]
            if (current.classList.contains('hidden')) {
                current.classList.remove('hidden')
            }
            await prev.classList.add('animate__slideOutDown')
            await prev.classList.add('hidden')
            await prev.classList.remove('animate__slideOutDown')
            await current.classList.replace('hidden', 'animate__slideInDown')
            if (index === children?.length - 1) {
                index = 0;
            }
            else {
                index = index + 1
            }
            timer.current = window.setTimeout(() => scroller(index), 5000)
        }
    }

    useEffect(() => {
        timer.current = window.setTimeout(() => scroller(0), 5000)
    }, [])

    return (
        <div ref={div} className='flex flex-col'>
            {props.publicTransport.map((item, ind) => {
                return <p key={ind} className='hidden animate__animated'>{item.headsign} {item.scheduledDeparture}</p>
            })
            }
        </div>
    )
}
export default TopBarRight