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


export const uploadImage = async (img: string): Promise<string> => {
  const id = uuid();
  await set(id,img);
  return id
};
// Use this to make the above happen.
export const getImage = async (imageId: string): Promise<string> => {
  const image = await get(imageId)
  return image
};
