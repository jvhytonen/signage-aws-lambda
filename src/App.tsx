import React from 'react';
import './App.css';

type doSomethingType = () => void
function App() {
  console.log(process.env.TEST)

const doSomething: doSomethingType = async () => {
 const response = await fetch('https://4r294n67b7.execute-api.eu-north-1.amazonaws.com/dev/flight-data')
 const data = await response.json()
 console.log(data)

}
 
  return (
    <div className="App h-full">
      <header className="App-header h-full">
        <div className='h-full'>
          <h1 onClick={doSomething}>Hello</h1>
        </div>
      </header>
    </div>
  );
}

export default App;
