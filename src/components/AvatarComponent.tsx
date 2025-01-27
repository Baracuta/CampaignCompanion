import { Avatar } from "@mui/material";
import { ASSETS_PATH } from "../constants/assets_path";

type AvatarProps={

}



function AvatarComponent(props:AvatarProps){


    return(
        <Avatar
            alt="Test"
            src={`${ASSETS_PATH}/npcs/Dragonborn f 2.jpg`}
        />
    )
}

export default AvatarComponent

//When I want to make this functional, I can use ThingList and pass new campaign props for favourites and for recent edits.