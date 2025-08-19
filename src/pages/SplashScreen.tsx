import SplashBackground from "../components/SplashBackground";
import "../css_modules/app.css"
import NavButton from "../components/NavButton";
import { ASSETS_PATH } from "../constants/assets_path";
import { GoogleLogin } from "@react-oauth/google";


//This is the Splash Screen when the application starts.
function SplashScreen() {

  return (
    <>
      
      <SplashBackground/>

      <div className="splash_items" >

        <img className="logo" src={`${ASSETS_PATH}/Emblem 1 3.png`} alt="" />
        <h1>Campaign Companion</h1>

        <div >
          <GoogleLogin
            onSuccess={async credentialResponse => {
              if (credentialResponse.credential) {
                await localStorage.setItem("google_token", credentialResponse.credential);
              } else {
                console.warn("Google credential is undefined.");
              }
              console.log(credentialResponse);
            }}
            theme="filled_black"
            shape="circle"
          />
        </div>

        <div className="options" >
          <NavButton text="Create New Campaign" destination="/campaign-form"/>
          <NavButton text="Load Existing Campaign" destination="/campaign-select"/>
        </div>

      </div> 

    </>
  )
}
  
  export default SplashScreen