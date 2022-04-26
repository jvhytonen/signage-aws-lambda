import React, { useState } from 'react';
import './App.css';
import FlightDataTable from './Components/FlightDataTable'
import { IataToCity } from './Utils/IataToCity.js'

// Date for development purposes
const NOWTEST = new Date('2022-04-14 10:43')

type fetchDataType = () => void

function App() {
const [flightData, setFlightData] = useState<any>([])

const fetchData: fetchDataType = async () => {
 const response = await fetch('http://localhost:3000/schedulesTEST.json')
 const data = await response.json()
 const flightDataItems = []
 for (let i = 0; i < data.response.length; i++) {
   if (data.response[i].dep_time_ts - 1649921700 > 21600) {
     console.log(data.response[i].dep_time_ts - 1649921700)
     console.log(data.response[i].airline_iata)
     break
   }
    const item = {
     airline: data.response[i].airline_iata,
     flightNr: data.response[i].flight_iata,
     destination: IataToCity(data.response[i].arr_iata),
     dep_time: data.response[i].dep_time,
     actualDep: data.response[i].dep_actual,
     estimatedDep: data.response[i].dep_estimated,
     terminal: data.response[i].dep_terminal,
     gate: data.response[i].dep_gate
    }
    flightDataItems.push(item)
  }
 setFlightData(flightDataItems)
 IataToCity('ARN')
}
 
  return (
    <div className="App h-full w-full">
          <h1 onClick={fetchData}>Hello</h1>
          {flightData !== null ? <FlightDataTable data={flightData}/> : <h1>No data</h1>}
    </div>
  );
}

export default App;
