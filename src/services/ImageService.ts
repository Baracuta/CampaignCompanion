import { v4 as uuid } from "uuid";
import { openDB } from "idb";

const dbPromise = openDB("Ayy the testing", 1, {
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
  // generate id with uuid
  const id = uuid();
  //put image in indexeddb with the key as that uuid
  await set(id,img);
  //return the uuid
  return id
};

export const getImage = async (imageId: string): Promise<string> => {
  // look for the image in indexeddb
  const image = await get(imageId)
  // return the image
  return image
};
