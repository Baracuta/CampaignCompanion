import styles from "../css_modules/imagelist.module.css";
import { ImageList, ImageListItem } from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import BigImage from "./BigImage";
import { useImages } from "../hooks/useImages";

type MapProps = {
  images: Array<string>;
  editMaps?: boolean;
  deleteMap: (imgKey: string) => Promise<unknown>;
};

export default function MapList(props: MapProps) {
  const editMode = props.editMaps != null;

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
              <BigImage src={images[item]}/>
              {editMode ? (
                <div className={styles.delete} onClick={() => {
                  props.deleteMap(item)
                  console.log(images[item])
                }}>
                  <DeleteForeverIcon fontSize="medium"/>
                </div>
                ): null
              }
            </ImageListItem>
          ))
      )}
      </ImageList>
    </div>
  );
}
