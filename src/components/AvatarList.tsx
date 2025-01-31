import { NPC } from "../types/NPC";
import { Location } from "../types/Location";
import { Item } from "../types/Item";
import { PlayerCharacter } from "../types/PlayerCharacter";
import AvatarComponent from "./AvatarComponent";

type listProps = {
  things: Array<NPC | Location | Item | PlayerCharacter>;
};

function AvatarList(props: listProps) {
  const divs = (props.things ?? []).map((datum) => (
    <AvatarComponent key={datum.id} thing={datum}/>
  ));

  return divs;
}

export default AvatarList;