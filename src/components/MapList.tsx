import styles from "../css_modules/imagelist.module.css";
import { ImageList, ImageListItem } from "@mui/material";
import BigImage from "./BigImage";
import { useImage } from "../hooks/useImage";

type MapProps = {
  images: Array<string>;
};

export default function MapList(props: MapProps) {
  const itemData = props.images;

  const FindImage = (key:string) => {
    return useImage(key as string) ?? ""
  }
  
  return (
    <div>
      <ImageList
        className={styles.image_list}
        sx={{ width: "auto", height: "350" }}
        cols={2}
        rowHeight={100}
      >
        {itemData != null && (
          itemData.map((item, idx) => (
            <ImageListItem className={styles.image_item} key={`image_${idx}`}>
              <BigImage src={FindImage(item)}/>
            </ImageListItem>
          ))
      )}
      </ImageList>
    </div>
  );
}
