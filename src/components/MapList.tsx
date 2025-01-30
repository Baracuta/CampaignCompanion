import styles from '../css_modules/imagelist.module.css';
import { Popover, ImageList, ImageListItem } from "@mui/material";
import { useState } from "react";
import { v4 as uuid } from "uuid";


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

  // const clickImage=(img:string)=>{
  //   props.imageClick(img);
  // }

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const itemData = props.images;


  // const [anchor2, setAnchor2] = useState<null | HTMLElement>(null);

  // const handleImage = (event: React.MouseEvent<HTMLElement>) => {
  //   setAnchor2(anchor2 ? null : event.currentTarget);
  // };

  // const open2 = Boolean(anchor2);
  // const id2 = open ? 'simple-popper' : undefined;


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
      <ImageList className={styles.image_list} sx={{ width: "auto", height: "350" }} cols={2} rowHeight={400}>
        {itemData.map((item) => (
          <ImageListItem className={styles.image_item} key={uuid()}>
            <img
              srcSet={`${item}`}
              src={`${item}?w=164&h=164&fit=crop&auto=format`}
              alt={item}
              loading="lazy"
              onClick={() => {
                // handleImage();
                
              }}
            />
          </ImageListItem>
        ))}
      </ImageList>
      <button onClick={handleClose}>Close</button>
    </Popover>
    {/* <Popper id={id2} open={open2} anchorEl={anchor2}>
      <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper' }}>
        The content of the Popper.
      </Box>
    </Popper> */}

  </div>
);
}
