import React, { useState, useEffect } from 'react';
import './App.css';
import FlightDataTable from './Components/FlightDataTable/FlightDataTable'
import { fetchArrData, fetchDepData } from './Utils/HTTPRequests'

type fetchDataType = () => void

function App() {
const [flightData, setFlightData] = useState<any>(null)
const fetchData: fetchDataType = async () => {
const depDataItems = await fetchDepData()
const arrDataItems = await fetchArrData()
const flightDataObj = {
  departures: depDataItems,
  arrivals: arrDataItems
}
 setFlightData(flightDataObj)
}

useEffect(() => {
  fetchData()
}, [])

  return (
    <div className="App h-full w-full">
          {flightData !== null ? <FlightDataTable data={flightData}/> : <h1>No data</h1>}
    </div>
  );
}

export default App;