import styles from '../css_modules/imagelist.module.css';
import { ImageList, ImageListItem, Popover } from "@mui/material";
import { NpcImageData } from "../constants/npc_image_bank";
import { useState } from "react";
import { ASSETS_PATH } from '../constants/assets_path';
import SingleFileUploader from './FileUploader';


type ListProps={
    images:typeof NpcImageData;
    imageClick: (img:string) => Promise<string>;
}


export default function StandardImageList(props:ListProps) {

    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
    setAnchorEl(null);
    };
  
    const clickImage=(img:string)=>{
      props.imageClick(img);
    }

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    const itemData = props.images;

  return (
    <div>
      <button aria-describedby={id} onClick={handleClick}>
        <p>Image List</p>
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
        <ImageList className={styles.image_list} sx={{ width: "auto", height: "auto" }} cols={4} rowHeight={364}>
          {itemData.map((item) => (
            <ImageListItem className={styles.image_item} key={item.img}>
              <img
                srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                src={`${ASSETS_PATH}${item.img}?w=164&h=164&fit=crop&auto=format`}
                alt={item.title}
                loading="lazy"
                onClick={() => {
                  clickImage(`${ASSETS_PATH}${item.img}`);
                  handleClose();
                }}
              />
            </ImageListItem>
          ))}
        </ImageList>
        <SingleFileUploader passedImage={props.imageClick}/>
        <button onClick={handleClose}>Close</button>
      </Popover>
    </div>
  );
}
