//This is gonna be the component for the searchbar.
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
}

// Something confirms that value matches an Entity ID. If it does, filter/find/sort divs to be just that one entity with the matching ID.
// Set value in the autocomplete box. Then clicking checks it. If yay, it does the thing. If not, nothing happens.

// Divs doesn't need to be the whole entityList. Just the one entity that has its ID being passed to it.
function SearchBar(props:SearchProps){
    const [value, setValue] = useState<string | null>();
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        // const clickValue = event.currentTarget;
        setAnchorEl(event.currentTarget);
        console.log(value);
    };
    const handleClose = () => {
    setAnchorEl(null);
    };
    const open = Boolean(anchorEl)
    const id = open ? "simple-popover" : undefined;

    const divs = (props.EntityList).map((datum) => (
        <ThingPopover
            key={datum.id}
            thing={datum}
            campaign={props.campaign}
            delete={props.delete}
            edit={props.update}
            anchorEl={anchorEl}
            handleClick={handleClick}
            handleClose={handleClose}
            id={id}
            open={open}
        />
    ))

    return (
        <>
            <Autocomplete
                className={styles.Autocomplete}
                freeSolo
                options={props.EntityList.map((option) => `${option.name} (${option.type})`)}
                value={value ?? ""}
                onChange={async (_event: unknown, newValue: string | null) => {
                    await setValue(newValue);
                    // await console.log(newValue);
                }}
        
                renderInput={(params) => (
                    <TextField {...params} label="" onClick={handleClick}/>
                )}
            />
            {divs}
        </>
    )
}

export default SearchBar