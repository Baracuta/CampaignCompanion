import './App.css'
import SplashBackground from './components/SplashBackground'

function App() {
  return (
    <>

      <SplashBackground/>

      <div className="splash-items">

        <img className="logo" src="src/assets/Emblem 1 3.png" alt="" />
        <h1>Campaign Companion</h1>
        <div className="card">
          <button>New Campaign</button>
        </div>

      </div> 

    </>
  )
}

export default App