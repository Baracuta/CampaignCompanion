import { ASSETS_PATH } from "../constants/assets_path"

function SplashBackground(){
    return(
        <div className="background-image">

         <img src={`${ASSETS_PATH}/Anûm_ The Continent of Isceria 1.2.jpg`} alt="" />
         <img src={`${ASSETS_PATH}/0x8vuwfue9391.webp`} alt="" />
         <img src={`${ASSETS_PATH}/Worldmap.jpg`} alt="" />

        </div>
    )
}

export default SplashBackground