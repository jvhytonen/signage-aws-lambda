import React, { useState, useEffect } from 'react';
import './App.css';
import FlightDataTable from './Components/FlightDataTable/FlightDataTable'
import { fetchApiData } from './Utils/HTTPRequests'
import Error from './Components/UI/Error'

type connectAPIType = () => void

function App() {
  const [apiData, setApiData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  

  const connectApi: connectAPIType = async () => {
    try {
      const fetchedItems = await fetchApiData()
      console.log(fetchedItems)
      if (fetchedItems === null) {
        return
      }

      setIsLoading(false)
      setApiData(fetchedItems)
    }
    catch (err) {
      console.log('Something went wrong')
    }
  }

  useEffect(() => {
    const intervalCall = setInterval(() => {
      setIsLoading(true)
      console.log('connecting')
      connectApi();
    }, 6000)
    return () => {
      clearInterval(intervalCall)
    }
  }, [])

  return (
    <div className="App h-full w-full">
      {apiData !== null ? <FlightDataTable data={apiData} /> : <Error message={`${isLoading ? 'Loading... ' : 'Something went wrong'}`} />}
    </div>
  );
}

export default App;