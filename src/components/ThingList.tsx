import { Campaign } from "../types/Campaign";
import { NPC } from "../types/NPC";
import { Location } from "../types/Location";
import { Item } from "../types/Item";
import { PlayerCharacter } from "../types/PlayerCharacter";
import ThingDisplay from "./ThingDisplay";

type listProps = {
  things: Array<NPC | Location | Item | PlayerCharacter>;
  campaign: Campaign;
  deleteThing:(campaign:string,thing:string) => Promise<unknown>;
  updateThing:(campaign:string, thing:NPC|Location|Item|PlayerCharacter) => Promise<unknown>;
};

function NPCList(props: listProps) {
  const divs = (props.things ?? []).map((datum) => (
    <ThingDisplay
      thing={datum}
      campaign={props.campaign}
      key={datum.id}
      delete={props.deleteThing}
      edit={props.updateThing}
    />
  ));

  return divs;
}

export default NPCList;