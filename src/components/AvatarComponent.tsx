import { Avatar } from "@mui/material";
import { useImage } from "../hooks/useImage";
import { Entity } from "../types/Entity";
import ThingPopover from "./ThingPopover";
import { Campaign } from "../types/Campaign";
import { Item } from "../types/Item";
import { NPC } from "../types/NPC";
import { PC } from "../types/PlayerCharacter";
import { Location } from "../types/Location";
import { useState } from "react";

type AvatarProps = {
    thing: Entity;
    campaign: Campaign;
    delete: (campaign: string, thing: Entity) => Promise<unknown>;
    update: (campaign: string, thing: NPC | Location | Item | PC) => Promise<unknown>;
};

function AvatarComponent(props: AvatarProps) {
    const image = useImage(props.thing?.image as string);
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
      const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
      };
      const handleClose = () => {
        setAnchorEl(null);
      };
      const open = Boolean(anchorEl)
      const id = open ? "simple-popover" : undefined;
  return (
    <div>
      <div onClick={handleClick}>
        <Avatar alt={props.thing?.name} src={image ?? ""} variant="rounded" />
      </div>
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
  );
}

export default AvatarComponent;