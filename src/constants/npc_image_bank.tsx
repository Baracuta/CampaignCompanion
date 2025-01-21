//This is where my pre-selectable images for NPCs are gonna go.

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

export default function StandardImageList() {
  return (
    <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
      {itemData.map((item) => (
        <ImageListItem key={item.img}>
          <img
            srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
            alt={item.title}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

const itemData = [
  {
    img: 'src/assets/npcs/e0b17c1ee4758165eb6599b35a17cdd5.jpg',
    title: 'Breakfast',
  },
  {
    img: 'src/assets/npcs/RDT_20240920_1339075717102947337391064.jpg',
    title: 'Lunch?',
  },
]