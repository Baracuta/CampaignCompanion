import styles from "../css_modules/toolbar.module.css";
import { Autocomplete, TextField } from "@mui/material";
import { Entity } from "../types/Entity";
import { Campaign } from "../types/Campaign";
import ThingPopover from "./ThingPopover";
import { useState } from "react";

type SearchProps = {
  EntityList: Array<Entity>;
  campaign: Campaign;
  delete: (campaign: string, thing: Entity) => Promise<unknown>;
  update: (campaign: string, thing: Entity) => Promise<unknown>;
};

function SearchBar(props: SearchProps) {
  const [value, setValue] = useState<string | null>();
  const [entity, setEntity] = useState<Entity | null>();

  const handleClose = () => {
    setEntity(null);
    setValue(null);
  };

  const popoverDiv = entity ? (
    <ThingPopover
      key={entity.id}
      thing={entity}
      campaign={props.campaign}
      delete={props.delete}
      edit={props.update}
      anchorEl={null}
      handleClose={handleClose}
      id="simple-popover"
      open
    />
  ) : null;

  return (
    <>
      <Autocomplete
        className={styles.Autocomplete}
        freeSolo
        options={props.EntityList.map(
          (option) => `${option.name} (${option.type})`
        )}
        value={value ?? ""}
        onChange={async (_event: unknown, newValue: string | null) => {
          setValue(newValue);
          const entity = props.EntityList.find(
            (option) => `${option.name} (${option.type})` === newValue
          );
          setEntity(entity);
        }}
        renderInput={(params) => <TextField {...params} label="" />}
      />
      {popoverDiv}
    </>
  );
}

export default SearchBar;
