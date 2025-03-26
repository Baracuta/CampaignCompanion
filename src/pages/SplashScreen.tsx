import SplashBackground from "../components/SplashBackground";
import "../css_modules/app.css"
import NavButton from "../components/NavButton";


//This is the Splash Screen when the application starts.
function SplashScreen() {
  
    return (
      <>
  
        <SplashBackground/>
  
        <div className="splash-items">
  
          <img className="logo" src="public/assets/Emblem 1 3.png" alt="" />
          <h1>Campaign Companion</h1>
          <div className="options">
            <NavButton text="Create New Campaign" destination="/campaign-form"/>
            <NavButton text="Load Existing Campaign" destination="/campaign-select"/>
          </div>
  
        </div> 
  
      </>
    )
  }
  
  export default SplashScreen