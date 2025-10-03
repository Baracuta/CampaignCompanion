import React, { useState } from "react";
import SplashBackground from "../components/SplashBackground";
import "../css_modules/app.css";
import NavButton from "../components/NavButton";
import { ASSETS_PATH } from "../constants/assets_path";
import { GoogleLogin } from "@react-oauth/google";
import { handleUser } from "../services/CampaignServiceFrontend";
import { imageAuth } from "../services/ImageService";


//This is the Splash Screen when the application starts.
function SplashScreen() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
                await handleUser();
                await imageAuth();
                setIsLoggedIn(true);
              } else {
                console.warn("Google credential is undefined.");
              }
              console.log("Login Successful", credentialResponse);
            }}
            theme="filled_black"
            shape="circle"
          />
        </div>

        {isLoggedIn && (
          <div className="options" >
            <NavButton text="Create New Campaign" destination="/campaign-form"/>
            <NavButton text="Load Existing Campaign" destination="/campaign-select"/>
          </div>
        )}

      </div> 

    </>
  )
}
  
  export default SplashScreen