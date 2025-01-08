
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import { useState } from "react";
import styles from "../css_modules/display.module.css";
import { NPC } from "../types/NPC";
import { Location } from "../types/Location";
import { Item } from "../types/Item";
import { PlayerCharacter } from "../types/PlayerCharacter";
import { Campaign } from "../types/Campaign";
import { deleteNPC } from "../services/CampaignService";
import NPCDetails from "./DetailsNPC";

type DisplayProps = {
  name?: string;
  description?: string;
  notes?: string;
  image?: string;
  thing: NPC | Location | Item | PlayerCharacter;
  campaign: Campaign;
};

export default function TestDisplay(props: DisplayProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    deleteNPC(props.campaign.id, props.thing.id);
  };

  return (
    <div className={styles.card}>
      <Button aria-describedby={id} variant="contained" onClick={handleClick}>
        <p>{props.thing.name}</p>
      </Button>

      <Popover
        className={styles.popover}
        anchorReference="anchorPosition"
        anchorPosition={{ top: 0, left: 0 }}
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <div className={styles.button_panel}>
          <button onClick={handleDelete}>Delete</button>
          <button onClick={handleClose}>Close</button>
        </div>

        <div className={styles.top}>
          <h2>{props.thing.name}</h2>
          <h3>{props.thing.description}</h3>
        </div>
        <textarea />
        {props.thing.type === "NPC" &&(
          <NPCDetails npc={props.thing as NPC} />
        )}
        

      </Popover>
    </div>
  );
}
