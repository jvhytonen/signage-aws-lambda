import React, { useState, useEffect } from 'react';
import './App.css';
import FlightDataTable from './Components/FlightDataTable/FlightDataTable'
import { fetchArrData, fetchDepData } from './Utils/HTTPRequests'
import Error from './Components/UI/Error'

type fetchDataType = () => void

function App() {
  const [flightData, setFlightData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  /* 
  const fetchData: fetchDataType = async () => {
  const depDataItems = await fetchDepData()
  const arrDataItems = await fetchArrData()
  setIsLoading(false)
  if (depDataItems === null) {
    return
  }
  const flightDataObj = {
    departures: depDataItems,
    arrivals: arrDataItems
  }
   setFlightData(flightDataObj)
  } */

  useEffect(() => {
    const fetchData: fetchDataType = async () => {
      try {
        const depDataItems = await fetchDepData()
        const arrDataItems = await fetchArrData()
        setIsLoading(false)
        if (depDataItems === null) {
          return
        }
        const flightDataObj = {
          departures: depDataItems,
          arrivals: arrDataItems
        }
        setFlightData(flightDataObj)
      }
      catch (err) {
        console.log('Something went wrong')
      }
    }
    fetchData()
  }, [])

  return (
    <div className="App h-full w-full">
      {flightData !== null ? <FlightDataTable data={flightData} /> : <Error message={`${isLoading ? 'Loading... ' : 'Something went wrong'}`} />}
    </div>
  );
}

export default App;