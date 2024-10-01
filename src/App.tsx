import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="background-image"></div>
      <div>
        <img className="logo" src="src/assets/Emblem 1 3.png" alt="" />
      </div>
      <h1>Campaign Companion</h1>
      <div className="card">
        <button>New Campaign</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        More to come later
      </p>
    </>
  )
}

export default App
