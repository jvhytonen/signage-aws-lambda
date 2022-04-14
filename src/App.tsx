import React from 'react';
import './App.css';

type doSomethingType = () => void
function App() {

const doSomething: doSomethingType = async () => {
  console.log('sdf')
 const response = await fetch('http://localhost:3000/schedulesTEST.json')
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
