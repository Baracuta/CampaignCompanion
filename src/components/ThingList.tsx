import { Campaign } from "../types/Campaign";
import { NPC } from "../types/NPC";
import { Location } from "../types/Location";
import { Item } from "../types/Item";
import { PlayerCharacter } from "../types/PlayerCharacter";
import TestDisplay from "./TestDisplay";

type listProps = {
  things: Array<NPC|Location|Item|PlayerCharacter>;
  campaign: Campaign;
  deleteThing:(campaign:string,thing:string) => Promise<unknown>;
};

function NPCList(props: listProps) {
  const divs = (props.things ?? []).map((datum) => (
    <TestDisplay
      thing={datum}
      campaign={props.campaign}
      key={datum.id}
      delete={props.deleteThing}
    />
  ));

  return divs;
}

export default NPCList;
