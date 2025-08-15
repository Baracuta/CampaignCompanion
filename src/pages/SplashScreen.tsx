import SplashBackground from "../components/SplashBackground";
import "../css_modules/app.css"
import NavButton from "../components/NavButton";
import { ASSETS_PATH } from "../constants/assets_path";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
// import { useState } from "react";


//This is the Splash Screen when the application starts.
function SplashScreen() {

  const handleLoginError = () => {
    console.error("Login failed");
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async ({code}) => {
      const tokens = await fetch('/api/user/google-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${code}`,
        }, body: JSON.stringify({ code }),
      });

      console.log("Login successful", tokens);
    },
    onError: handleLoginError,
    flow: 'auth-code',
  });

    return (
      <>
        
        <SplashBackground/>
  
        <div className="splash_items" >
  
          <img className="logo" src={`${ASSETS_PATH}/Emblem 1 3.png`} alt="" />
          <h1>Campaign Companion</h1>

          <div >
            <GoogleLogin
              onSuccess={() => {
                googleLogin();
              }}
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