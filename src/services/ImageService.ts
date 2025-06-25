import { v4 as uuid } from "uuid";
import { openDB } from "idb";

const dbPromise = openDB("Saved Images", 1, {
  upgrade(db) {
    db.createObjectStore("keyval");
  },
});

export async function get(key:string) {
  return (await dbPromise).get("keyval", key);
}
export async function set(key:string, val:string) {
  return (await dbPromise).put("keyval", val, key);
}
export async function del(key:string) {
  return (await dbPromise).delete("keyval", key);
}
export async function clear() {
  return (await dbPromise).clear("keyval");
}
export async function keys() {
  return (await dbPromise).getAllKeys("keyval");
}
// Need to make it so uploadImage checks to see if there is already a keyval pair for the thing.
// OR, it needs to just delete the previous one if there is already one.
export const uploadImage = async (img: string): Promise<string> => {
  const id = uuid();
  await set(id,img);
  return id
};
// Use this to make the above happen.
// Prioritize making this work before next meeting
// Look into refining the whole image upload process
// Also have to get the favourite star clickable on the main thingdisplay
export const getImage = async (imageId: string): Promise<string> => {
  const image = await get(imageId)
  return image
};
