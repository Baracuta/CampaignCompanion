import { useState } from 'react'
import './App.css'
import { Navigate, Router, useNavigate } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="background-image">
        <img src="src/assets/Anûm_ The Continent of Isceria v1.1.png" alt="" />
        <img src="src/assets/0x8vuwfue9391.webp" alt="" />
        <img src="src/assets/Worldmap.jpg" alt="" />
      </div>
      <div className="splash-items">
        <img className="logo" src="src/assets/Emblem 1 3.png" alt="" />
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
      </div>
      
    </>
  )
}

export default App
