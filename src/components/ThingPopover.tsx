import styles from "../css_modules/display.module.css"
import { Popover } from "@mui/material"
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { Item } from "../types/Item"
import { NPC } from "../types/NPC"
import { PlayerCharacter } from "../types/PlayerCharacter"
import AddItem from "./AddItem"
import AddLocation from "./AddLocation"
import AddNPC from "./AddNPC"
import AddPC from "./AddPC"
import DeleteDialogue from "./DeleteDialogue"
import ItemDetails from "./DetailsItem"
import LocationDetails from "./DetailsLocation"
import NPCDetails from "./DetailsNPC"
import PlayerCharacterDetails from "./DetailsPlayerCharacter"
import { Campaign } from "../types/Campaign"

type PopProps = {
  thing: NPC | Location | Item | PlayerCharacter;
  campaign: Campaign;
  delete: (campaign: string, thing: string) => Promise<unknown>;
  edit: (
    campaign: string,
    thing: NPC | Location | Item | PlayerCharacter
  ) => Promise<unknown>;
  open: boolean;
};

export default function ThingPopover(props:PopProps){

    return(
         <Popover
                className={styles.popover}
                anchorReference="anchorPosition"
                anchorPosition={{ top: 0, left: 0 }}
                id={id}
                open={props.open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
              >
                <div className={styles.button_panel}>
                  {props.thing.isFavourite ? (
                    <StarIcon fontSize="large" />
                  ) : (
                    <StarBorderIcon fontSize="large" />
                  )}
                  {props.thing.type === "NPC" && (
                    <AddNPC
                      campaignId={props.campaign.id as string}
                      addThing={props.edit}
                      editNpc={props.thing}
                    />
                  )}
                  {props.thing.type === "Location" && (
                    <AddLocation
                      campaignId={props.campaign.id as string}
                      addThing={props.edit}
                      editLocation={props.thing}
                    />
                  )}
                  {props.thing.type === "Item" && (
                    <AddItem
                      campaignId={props.campaign.id as string}
                      addThing={props.edit}
                      editItem={props.thing}
                    />
                  )}
                  {props.thing.type === "PC" && (
                    <AddPC
                      campaignId={props.campaign.id as string}
                      addThing={props.edit}
                      editPC={props.thing}
                    />
                  )}
                  <DeleteDialogue
                    delete={props.delete}
                    thingID={props.thing.id}
                    campaignID={props.campaign.id}
                  />
                  <button onClick={handleClose}>Close</button>
                </div>
        
                {props.thing.type === "NPC" && <NPCDetails npc={props.thing as NPC} />}
                {props.thing.type === "Location" && (
                  <LocationDetails location={props.thing as Location} />
                )}
                {props.thing.type === "Item" && (
                  <ItemDetails item={props.thing as Item} />
                )}
                {props.thing.type === "PC" && (
                  <PlayerCharacterDetails pc={props.thing as PlayerCharacter} />
                )}
              </Popover>
            </div>
    )
}