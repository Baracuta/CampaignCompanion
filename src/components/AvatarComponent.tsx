import { Avatar } from "@mui/material";
import { useImage } from "../hooks/useImage";
import { Entity } from "../types/Entity";
import { useState } from "react";
import ThingPopover from "./ThingPopover";
import { Campaign } from "../types/Campaign";
import { Item } from "../types/Item";
import { NPC } from "../types/NPC";
import { PC } from "../types/PlayerCharacter";
import { Location } from "../types/Location";

type AvatarProps = {
    thing: Entity;
    campaign: Campaign;
    delete: (campaign: string, thing: string) => Promise<unknown>;
    update: (campaign: string, thing: NPC | Location | Item | PC) => Promise<unknown>;
};

function AvatarComponent(props: AvatarProps) {
    const image = useImage(props.thing?.image as string);
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
      const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
      };
      const handleClose = () => {
        setAnchorEl(null);
      };
      const open = Boolean(anchorEl)
      const id = open ? "simple-popover" : undefined;
  return (
    <div>
      <div>
        <Avatar alt={props.thing?.name} src={image ?? ""} variant="rounded" />

        <ThingPopover
            thing={props.thing}
            campaign={props.campaign}
            delete={props.delete}
            edit={props.update}
            anchorEl={anchorEl}
            handleClick={handleClick}
            handleClose={handleClose}
            id={id}
            open={open}
        />
      </div>
    </div>
  );
}

export default AvatarComponent;

//When I want to make this functional, I can use ThingList and pass new campaign props for favourites and for recent edits.
//Give each campaign new arrays for favourites and recentedits. Use them in the service.
