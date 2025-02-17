import styles from "../css_modules/imagelist.module.css";
import { ImageList, ImageListItem } from "@mui/material";
import BigImage from "./BigImage";
import { useImages } from "../hooks/useImages";

type MapProps = {
  images: Array<string>;
};

export default function MapList(props: MapProps) {

  const images = useImages(props.images);
  
  
  return (
    <div>
      <ImageList
        className={styles.image_list}
        sx={{ width: "auto", height: "350" }}
        cols={2}
        rowHeight={100}
      >
        {props.images != null && (
          props.images.map((item, idx) => (
            <ImageListItem className={styles.image_item} key={`image_${idx}`}>
              <BigImage src={images.item}/>
            </ImageListItem>
          ))
      )}
      </ImageList>
    </div>
  );
}
