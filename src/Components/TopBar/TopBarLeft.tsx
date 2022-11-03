import { useEffect, useState } from "react"

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

type createTopBarDateType = () => void

const TopBarLeft = () => {
    const [time, setTime] = useState<string>()

    const createTopBarDate: createTopBarDateType = () => {
        //This function creates a date to the topbar and updates it every minute. 
        // It creates the right suffix based on the day: "1st or 5th etc.".
        let now = new Date()
        let weekDay = DAYS[now.getDay()]
        let monthDay = now.getDate()
        let suffix
        if (monthDay === 1 || monthDay === 21 || monthDay === 31) {
            suffix = 'st'
        }
        else if (monthDay === 2 || monthDay === 22) {
            suffix = 'nd'
        }
        else if (monthDay === 3 || monthDay === 23) {
            suffix = 'rd'
        }
        else {
            suffix = 'th'
        }
        let month = MONTHS[now.getMonth()]
        let hours = now.getHours() < 10 ? '0' + now.getHours() : now.getHours()
        let minutes = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes()
        setTime(weekDay + ' ' + month + ' ' + monthDay + suffix + ' ' + hours + ':' + minutes)
    }

    useEffect(() => {
        const interval = setTimeout(() => {
            createTopBarDate()
    
        }, 60000)
        return () => clearTimeout(interval)
    }, [])

    useEffect(() => {
        createTopBarDate()
    })

    return (
       <div>
         {time}
       </div>
    )
}
export default TopBarLeft