// import styles from '../css_modules/avatars.module.css'
import AvatarComponent from "./AvatarComponent";
import { Entity } from "../types/Entity";
import { AvatarGroup } from "@mui/material";

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


  return (
    <AvatarGroup max={6} spacing={-5}>
      {divs}
    </AvatarGroup>
  )
}

export default AvatarList;
