import SplashBackground from "../components/SplashBackground";
import "../css_modules/app.css"
import NavButton from "../components/NavButton";
import { ASSETS_PATH } from "../constants/assets_path";
import { GoogleLogin } from "@react-oauth/google";
// import { useState } from "react";


//This is the Splash Screen when the application starts.
function SplashScreen() {
  // const [logged, setLogged] = useState(false);

  // const handleLoginSuccess = () => { 
  //   setLogged(true);
  // };
  const handleLoginError = () => {
    console.error("Login failed");
  };

    return (
      <>
  
        <SplashBackground/>
  
        <div className="splash_items" >
  
          <img className="logo" src={`${ASSETS_PATH}/Emblem 1 3.png`} alt="" />
          <h1>Campaign Companion</h1>

          <div >
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                // handleLoginSuccess();
                console.log(credentialResponse);
              }}
              onError={handleLoginError}
              theme="filled_black"
              shape="circle"
              auto_select={true}
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