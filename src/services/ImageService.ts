import { v4 as uuid } from "uuid";
import { createClient } from "@supabase/supabase-js";
import { openDB } from "idb";


const REACT_APP_SUPABASE_URL='https://udttspdqobiflnklluuf.supabase.co'
const REACT_APP_SUPABASE_ANON_KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVkdHRzcGRxb2JpZmxua2xsdXVmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY5MDUxMTQsImV4cCI6MjA3MjQ4MTExNH0.-olNmzIS5uIn7rhHmR6S26sTejJ9HhUK3lO7re6Gn6E'

const supabase = createClient(REACT_APP_SUPABASE_URL, REACT_APP_SUPABASE_ANON_KEY)


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
