import React from "react"

export interface FlightDataItems {
    airline?: string
     flightNr?: string
     destination?:string
     dep_time: string
     actualDep?: string
     estimatedDep?: string
     terminal?: string
     gate: string
}

export interface FlightDataType {
    data: FlightDataItems[]
}

const FlightDataTable = (props: FlightDataType) => {
     const rows = props.data.map((item: any, index:any) => {
        return (
            <tr key={index} className='border-2'>
                <td >{item.airline}</td>
                <td >{item.flightNr}</td>
                <td>{item.destination}</td>
                <td className='w-full text-center' >{item.dep_time}</td>
                <td>{item.gate}</td>
            </tr>
        )
    }) 

    return (
        <div className='h-full w-5/6 border-2 m-2'>
            <table>
                <tr>
                    <th>Airline</th>
                    <th>Flight</th>
                    <th>Destination</th>
                    <th>Departure</th>
                    <th>Gate</th>
                </tr>
            {rows}
            </table>
        </div>
    )
}
export default FlightDataTable