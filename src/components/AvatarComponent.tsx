import { Avatar } from "@mui/material";
import { ASSETS_PATH } from "../constants/assets_path";




function AvatarComponent(){


    return(
        <Avatar
            alt="Test"
            src={`${ASSETS_PATH}/npcs/Dragonborn f 2.jpg`}
        />
    )
}

export default AvatarComponent