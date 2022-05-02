import React, { useState } from 'react';
import './App.css';
import FlightDataTable, { FlightDataItemsType } from './Components/FlightDataTable/FlightDataTable'
import { IataToCity } from './Utils/AirportIataToCity.js'
import { AirlineIataToName, FormatArrays } from './Utils/AirlineIataToName';
import { formatDate } from './Utils/FormatDate';

// Date for development purposes
const NOWTEST = new Date('2022-04-14 10:43')

interface codeShareType {
  airline: string
  flightNr: string,
  codeShareNr: string
}

type fetchDataType = () => void

function App() {
const [flightData, setFlightData] = useState<any>([])

const fetchData: fetchDataType = async () => {
 const response = await fetch('http://localhost:3000/schedulesTEST.json')
 const data = await response.json()
 const flightDataItems:FlightDataItemsType[] = []
 const codeShares: codeShareType[] = []
//  First we loop trough object to find original (not codeshare) flights within the given time radius. 
 for (let i = 0; i < data.response.length; i++) {
   if (data.response[i].dep_time_ts - 1649921700 > 21600) {
     break
   }
   if (data.response[i].cs_flight_iata !== null) {
     const csItem:codeShareType = {
        airline: data.response[i].airline_iata,
        flightNr: data.response[i].flight_iata,
        codeShareNr: data.response[i].cs_flight_iata
     }
     codeShares.push(csItem)
    continue
    }
    const item = {
     codeShareNr: data.response[i].cs_flight_number,
     airline: [[AirlineIataToName(data.response[i].airline_iata)]],
     flightNr: [[data.response[i].flight_iata]],
     destination: IataToCity(data.response[i].arr_iata),
     depTime: formatDate(data.response[i].dep_time),
     actualDep: data.response[i].dep_actual,
     estimatedDep: data.response[i].dep_estimated ? formatDate(data.response[i].dep_estimated) : ' ',
     terminal: data.response[i].dep_terminal,
     gate: data.response[i].dep_gate
    }
    flightDataItems.push(item)
  }
  // Then we loop again to push all codeshare flights into the item where they belong
    for (let i = 0; i < codeShares.length; i++) {
      let csItem = codeShares[i].codeShareNr
      let flightNr = codeShares[i].flightNr
      let csAirline = AirlineIataToName(codeShares[i].airline)
      flightDataItems.forEach((item) => {
        if (item.flightNr[0][0] === csItem) {
          const newNr = FormatArrays(item.flightNr, flightNr)
          item.flightNr = newNr
          const newAirline = FormatArrays(item.airline, csAirline)
          item.airline = newAirline
        }
      })
    }
 setFlightData(flightDataItems)
}

  return (
    <div className="App h-full w-full">
          <h1 onClick={fetchData}>Hello</h1>
          {flightData !== null ? <FlightDataTable data={flightData}/> : <h1>No data</h1>}
    </div>
  );
}

export default App;