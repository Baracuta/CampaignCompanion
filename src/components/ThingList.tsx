import { Campaign } from "../types/Campaign";
import { NPC } from "../types/NPC";
import { Location } from "../types/Location";
import { Item } from "../types/Item";
import { PC } from "../types/PlayerCharacter";
import ThingDisplay from "./ThingDisplay";

type listProps = {
  things: Array<NPC | Location | Item | PC>;
  campaign: Campaign;
  deleteThing:(campaign:string,thing:string) => Promise<unknown>;
  updateThing:(campaign:string, thing:NPC|Location|Item|PC) => Promise<unknown>;
};

function NPCList(props: listProps) {
  const divs = (props.things ?? []).map((datum) => (
    <ThingDisplay
      thing={datum}
      campaign={props.campaign}
      key={datum.id}
      delete={props.deleteThing}
      update={props.updateThing}
    />
  ));

  return divs;
}

export default NPCList;