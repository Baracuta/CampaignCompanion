import { Avatar } from "@mui/material";
import { Location } from "../types/Location";
import { Item } from "../types/Item";
import { NPC } from "../types/NPC";
import { PlayerCharacter } from "../types/PlayerCharacter";
import { useImage } from "../hooks/useImage";

type AvatarProps={
    thing?: NPC | Location | Item | PlayerCharacter;

}



function AvatarComponent(props:AvatarProps){
  const image = useImage(props.thing?.image as string);


    return(
        <Avatar
            alt={props.thing?.name}
            src={image ?? ""} 
            variant="rounded"
        />
    )
}

export default AvatarComponent

//When I want to make this functional, I can use ThingList and pass new campaign props for favourites and for recent edits.
//Give each campaign new arrays for favourites and recentedits. Use them in the service.