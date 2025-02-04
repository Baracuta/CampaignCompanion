import AvatarComponent from "./AvatarComponent";
import { Entity } from "../types/Entity";

type listProps = {
  things: Array<Entity>;
};

function AvatarList(props: listProps) {
  const thingsArray = (props.things ?? []).sort(
    (a: Entity, b: Entity) => b.modifiedDate - a.modifiedDate
  );

  const divs = (thingsArray ?? []).map((datum) => (
    <AvatarComponent key={datum.id} thing={datum} />
  ));

  return divs;
}

export default AvatarList;
