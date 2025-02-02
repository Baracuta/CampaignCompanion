import styles from '../css_modules/imagelist.module.css';
import { Popover, ImageList, ImageListItem } from "@mui/material";
import { useState } from "react";
import BigImage from './BigImage';


type MapProps={
    images:Array<string>;
}

export default function MapList(props:MapProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
  setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const itemData = props.images;

return (
  <div>
    <button aria-describedby={id} onClick={handleClick}>
      <p>View Maps</p>
    </button>

    <Popover
      className="testing"
      anchorReference="anchorPosition"
      anchorPosition={{ top: 0, left: 0 }}
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
    >
      <ImageList className={styles.image_list} sx={{ width: "auto", height: "350" }} cols={2} rowHeight={650}>
        {itemData.map((item, idx) => (
          <ImageListItem className={styles.image_item} key={`image_${idx}`}>
            <img
              srcSet={`${item}`}
              src={`${item}?w=164&h=164&fit=crop&auto=format`}
              alt={item}
              loading="lazy"
            />
            <BigImage item={item}/>
          </ImageListItem>
        ))}
      </ImageList>
      <button onClick={handleClose}>Close</button>
    </Popover>
  </div>
);
}
