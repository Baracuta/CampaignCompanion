import { v4 as uuid } from "uuid";
import { createClient } from "@supabase/supabase-js";
import { getUser } from "./CampaignServiceFrontend";
import { ASSETS_PATH } from "../constants/assets_path";



const SUPABASE_URL='https://udttspdqobiflnklluuf.supabase.co'
const SUPABASE_ANON_KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVkdHRzcGRxb2JpZmxua2xsdXVmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY5MDUxMTQsImV4cCI6MjA3MjQ4MTExNH0.-olNmzIS5uIn7rhHmR6S26sTejJ9HhUK3lO7re6Gn6E'

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
const BUCKET = ('images');

async function base64ToBlob(base64: string): Promise<Blob> {
  const byteString = atob(base64.split(',')[1]);
  const mimeString = base64.split(',')[0].split(':')[1].split(';')[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeString });
}

async function authenticate () {
  const { data, error } = await supabase.auth.signInWithIdToken({
    provider: 'google',
    token: localStorage.getItem("google_token") as string
  });

  if (error) {
    throw error;
  }
  return data;
}


export const del = async (imageId:string) => {
  const user = await getUser();
  if (user == null) throw new Error("User not logged in");
  const path = `${user.id}/${imageId}`;

  await authenticate();

  const { error } = await supabase
  .storage
  .from(BUCKET)
  .remove([path]);
  if (error) throw error;
};

export const uploadImage = async (img: string): Promise<string> => {
  const user = await getUser();
  if (user == null) throw new Error("User not logged in");
  const id = uuid();
  const path = `${user.id}/${id}`;

  await authenticate();

  try {
    const blob = await base64ToBlob(img);
    const { error } = await supabase
    .storage
    .from(BUCKET)
    .upload(path, blob, {
      cacheControl: '3600',
      upsert: false,
      contentType: 'image/*',
    });

    if (error) throw error;

  } catch {
    const { error } = await supabase
    .storage
    .from(BUCKET)
    .upload(path, (ASSETS_PATH + img),{
      cacheControl: '3600',
      upsert: false,
    });

    if (error) throw error;
  }

  return id;
};

export const getImage = async (imageId: string): Promise<string> => {
  const user = await getUser();
  if (user == null) throw new Error("User not logged in");

  const path = `${user.id}/${imageId}`;

  await authenticate();

  const image = await supabase.storage.from(BUCKET).getPublicUrl(path);

  if (image.data.publicUrl == null) throw new Error("Image not found");

  return image.data.publicUrl;
};
