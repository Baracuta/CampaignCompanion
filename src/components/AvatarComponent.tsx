import { Avatar } from "@mui/material";
import { Location } from "../types/Location";
import { Item } from "../types/Item";
import { NPC } from "../types/NPC";
import { PlayerCharacter } from "../types/PlayerCharacter";

type AvatarProps={
    thing?: NPC | Location | Item | PlayerCharacter;

}



function AvatarComponent(props:AvatarProps){


    return(
        <Avatar
            alt={props.thing?.name}
            src={props.thing?.image} //props.thing.image, usually
            variant="rounded"
        />
    )
}

export default AvatarComponent

//When I want to make this functional, I can use ThingList and pass new campaign props for favourites and for recent edits.
//Give each campaign new arrays for favourites and recentedits. Use them in the service.