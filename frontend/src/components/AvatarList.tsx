// import styles from '../css_modules/avatars.module.css'
import AvatarComponent from "./AvatarComponent";
import { Entity } from "../types/Entity";
import { AvatarGroup } from "@mui/material";
import { Location } from "../types/Location";
import { Campaign } from "../types/Campaign";
import { Item } from "../types/Item";
import { NPC } from "../types/NPC";
import { PC } from "../types/PlayerCharacter";

type listProps = {
  things: Array<Entity>;
  campaign: Campaign;
  delete: (campaign: string, thing: Entity) => Promise<unknown>;
  update: (campaign: string, thing: NPC | Location | Item | PC) => Promise<unknown>;
};

function AvatarList(props: listProps) {
  
  const divs = (props.things.slice(0,5) ?? []).map((datum) => (
    <AvatarComponent
      key={datum.id}
      thing={datum}
      campaign={props.campaign}
      delete={props.delete}
      update={props.update}
    />
  ));


  return (
    <AvatarGroup max={6} spacing={-5}>
      {divs}
    </AvatarGroup>
  )
}

export default AvatarList;
