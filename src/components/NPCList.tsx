import Card from "./Card";
import { NPC } from "../types/NPC";

type listProps = {
  npcs?: Array<NPC>;
};

function NPCList(props: listProps) {
  const divs = (props.npcs ?? []).map((datum) => (
    <Card name={datum.name} cardLink={``} key={datum.id}></Card>
  ));

  return divs;
}

export default NPCList;
