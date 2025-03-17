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

function SearchBar(props:SearchProps){
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
    setAnchorEl(null);
    };
    const open = Boolean(anchorEl)
    const id = open ? "simple-popover" : undefined;

    // Add in the logic for ThingPopovers
    //  and set the trigger for "open" to onChange in the Autocomplete

    return (
        <div>
            <Autocomplete
                className={styles.Autocomplete}
                freeSolo
                options={props.EntityList.map((option) => `${option.name} (${option.type})`)}
                // value={item.category ?? ""}
                // onChange={(e, value) => {
                //     const category = value ?? undefined;
                //     setItem({ ...item, category });
                // }}
                onChange={console.log}
                renderInput={(params) => (
                    <TextField {...params} label=""/>
                )}
            />

            <ThingPopover
                thing={props.thing}
                campaign={props.campaign}
                delete={props.delete}
                edit={props.update}
                anchorEl={anchorEl}
                handleClick={handleClick}
                handleClose={handleClose}
                id={id}
                open={open}
            />
        </div>
    )
}

export default SearchBar