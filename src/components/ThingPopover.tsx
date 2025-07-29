import styles from "../css_modules/display.module.css";
import { Popover } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { Item } from "../types/Item";
import { NPC } from "../types/NPC";
import { PC } from "../types/PlayerCharacter";
import AddItem from "./AddItem";
import AddLocation from "./AddLocation";
import AddNPC from "./AddNPC";
import AddPC from "./AddPC";
import DeleteDialogue from "./DeleteDialogue";
import ItemDetails from "./DetailsItem";
import LocationDetails from "./DetailsLocation";
import NPCDetails from "./DetailsNPC";
import PlayerCharacterDetails from "./DetailsPlayerCharacter";
import { Campaign } from "../types/Campaign";
import { Location } from "../types/Location";
import { Entity } from "../types/Entity";

type PopProps = {
  thing: Entity;
  campaign: Campaign;
  delete: (campaign: string, thing: Entity) => Promise<unknown>;
  edit: (campaign: string, thing: Entity) => Promise<unknown>;
  anchorEl: HTMLElement | null;
  handleClose: () => void;
  id: string | undefined;
  open: boolean;
};

export default function ThingPopover(props: PopProps) {
  const favourite = props.thing.isfavourite === true;

  return (
    <Popover
      className={styles.popover}
      anchorReference="anchorPosition"
      anchorPosition={{ top: 0, left: 0 }}
      id={props.id}
      open={props.open}
      anchorEl={props.anchorEl}
      onClose={props.handleClose}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
    >
      <div className={styles.button_panel}>
        <div
          className={styles.icon}
          onClick={async () => {
            const isfavourite = !props.thing.isfavourite;
            await props.edit(props.campaign.id, {
              ...props.thing,
              isfavourite,
            } as Entity);
          }}
        >
          {" "}
          {favourite === true ? (
            <StarIcon fontSize="large" />
          ) : (
            <StarBorderIcon fontSize="large" />
          )}
        </div>

        {props.thing.type === "NPC" && (
          <AddNPC
            campaignId={props.campaign.id as string}
            addThing={props.edit}
            editNpc={props.thing as NPC}
          />
        )}
        {props.thing.type === "Location" && (
          <AddLocation
            campaignId={props.campaign.id as string}
            addThing={props.edit}
            editLocation={props.thing as Location}
          />
        )}
        {props.thing.type === "Item" && (
          <AddItem
            campaignId={props.campaign.id as string}
            addThing={props.edit}
            editItem={props.thing as Item}
          />
        )}
        {props.thing.type === "PC" && (
          <AddPC
            campaignId={props.campaign.id as string}
            addThing={props.edit}
            editPC={props.thing as PC}
          />
        )}
        <DeleteDialogue
          delete={props.delete}
          thing={props.thing}
          campaignID={props.campaign.id}
        />
        <button onClick={props.handleClose}>Close</button>
      </div>

      {props.thing.type === "NPC" && <NPCDetails npc={props.thing as NPC} />}
      {props.thing.type === "Location" && (
        <LocationDetails location={props.thing as Location} />
      )}
      {props.thing.type === "Item" && (
        <ItemDetails item={props.thing as Item} />
      )}
      {props.thing.type === "PC" && (
        <PlayerCharacterDetails pc={props.thing as PC} />
      )}
    </Popover>
  );
}
