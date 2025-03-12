import Button from "@mui/material/Button";
import { useState } from "react";
import styles from "../css_modules/display.module.css";
import { NPC } from "../types/NPC";
import { Location } from "../types/Location";
import { Item } from "../types/Item";
import { PC } from "../types/PlayerCharacter";
import { Campaign } from "../types/Campaign";
import ThingPopover from "./ThingPopover";
import { Entity } from "../types/Entity";

type DisplayProps = {
  thing: Entity;
  campaign: Campaign;
  delete: (campaign: string, thing: string) => Promise<unknown>;
  update: (
    campaign: string,
    thing: NPC | Location | Item | PC
  ) => Promise<unknown>;
};
//Make some sort of onClick component for the clickable star.
export default function ThingDisplay(props: DisplayProps) {
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
    <div className={styles.card}>
      <Button aria-describedby={id} variant="contained" onClick={handleClick}>
        <p>{props.thing.name}</p>
      </Button>

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
