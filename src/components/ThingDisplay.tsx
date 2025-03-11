import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useState } from "react";
import styles from "../css_modules/display.module.css";
import { NPC } from "../types/NPC";
import { Location } from "../types/Location";
import { Item } from "../types/Item";
import { PlayerCharacter } from "../types/PlayerCharacter";
import { Campaign } from "../types/Campaign";
import NPCDetails from "./DetailsNPC";
import LocationDetails from "./DetailsLocation";
import ItemDetails from "./DetailsItem";
import PlayerCharacterDetails from "./DetailsPlayerCharacter";
import DeleteDialogue from "./DeleteDialogue";
import AddNPC from "./AddNPC";
import AddLocation from "./AddLocation";
import AddItem from "./AddItem";
import AddPC from "./AddPC";
import ThingPopover from "./ThingPopover";

type DisplayProps = {
  thing: NPC | Location | Item | PlayerCharacter;
  campaign: Campaign;
  delete: (campaign: string, thing: string) => Promise<unknown>;
  edit: (
    campaign: string,
    thing: NPC | Location | Item | PlayerCharacter
  ) => Promise<unknown>;
};
//Make some sort of onClick component for the clickable star.
export default function ThingDisplay(props: DisplayProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
 
  return (
    <div className={styles.card}>
      <Button aria-describedby={id} variant="contained" onClick={handleClick}>
        <p>{props.thing.name}</p>
      </Button>

      <ThingPopover thing={props.thing}/>
    </div>
  );
}
