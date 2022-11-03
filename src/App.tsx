import React, { useState, useEffect } from 'react';
import './App.css';
import View from './Components/View/View'
import { fetchApiData, mockFetch } from './Utils/HTTPRequests'
import Error from './Components/UI/Error'

type connectAPIType = () => void

const USER_NAME = 'test3'

function App() {
  // Hooks handling API data and loading of data. 
  const [apiData, setApiData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  

  const connectApi: connectAPIType = async () => {
    try {
      const fetchedItems = await mockFetch(USER_NAME)
      if (fetchedItems === null) {
        return
      }
      setIsLoading(false)
      setApiData(fetchedItems)
    }
    catch (err) {
      console.log(err)
      console.log('Something went wrong')
    }
  }
 
/*   useEffect(() => {
    const intervalCall = setInterval(() => {
      setIsLoading(true)
      console.log('Timeout-made connection')
      connectApi();
    }, 20000)
    return () => {
      clearInterval(intervalCall)
    }
  }, []) */



  useEffect(() => {
      setIsLoading(true)
      console.log('connecting')
      connectApi();
  }, [])

  return (
    <div className="App h-screen w-full">
      {apiData !== null ? <View data={apiData} /> : <Error message={`${isLoading ? 'Loading... ' : 'Something went wrong'}`} />}
    </div>
  );
}

export default App;