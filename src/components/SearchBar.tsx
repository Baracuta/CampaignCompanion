//This is gonna be the component for the searchbar.
import styles from "../css_modules/toolbar.module.css";
import { Autocomplete, TextField } from "@mui/material";
import { Entity } from "../types/Entity";



type SearchProps = {
    EntityList: Array<Entity>;
}

function SearchBar(props:SearchProps){



    return (
        <Autocomplete
            className={styles.Autocomplete}
            freeSolo
            options={props.EntityList.map((option) => option.name)}
            // value={item.category ?? ""}
            // onChange={(e, value) => {
            //     const category = value ?? undefined;
            //     setItem({ ...item, category });
            // }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label=""
                    type="search"
                />
            )}
        />
    )
}

export default SearchBar