import { useNavigate } from "react-router-dom";
import SplashBackground from "../components/SplashBackground";
import "../CSS Modules/App.css"


//This is the Splash Screen when the application starts.
function SplashScreen() {
    const navigate=useNavigate();
  
    return (
      <>
  
        <SplashBackground/>
  
        <div className="splash-items">
  
          <img className="logo" src="src/assets/Emblem 1 3.png" alt="" />
          <h1>Campaign Companion</h1>
          <div className="card">
            
            <button onClick={()=>{navigate("/new-campaign")}}>
              New Campaign
              </button>
          </div>
  
        </div> 
  
      </>
    )
  }
  
  export default SplashScreen