import { v4 as uuid } from "uuid";
import { createClient } from "@supabase/supabase-js";
import { getUser } from "./CampaignServiceFrontend";



const SUPABASE_URL=import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON_KEY=import.meta.env.VITE_SUPABASE_ANON_KEY

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

export async function imageAuth () {
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

  if (imageId.startsWith("/CampaignCompanion")) {
    return;
  } else if (await supabase.storage.from(BUCKET).exists(path)) {
    await supabase.storage.from(BUCKET).remove([path, `${path}`]);
  }
};

export const uploadImage = async (img: string): Promise<string> => {
  const user = await getUser();
  if (user == null) throw new Error("User not logged in");
  


  if (img.startsWith("/CampaignCompanion")) {
    const id = img;
    return id;
  } else {
    const id = uuid();
    const path = `${user.id}/${id}`;
    const blob = await base64ToBlob(img);
    await supabase
    .storage
    .from(BUCKET)
    .upload(path, blob, {
      cacheControl: '3600',
      upsert: false,
      contentType: 'image/*',
    });

    return id;
  }
};

export const getImage = async (imageId: string): Promise<string> => {
  const user = await getUser();
  if (user == null) throw new Error("User not logged in");
  const path = `${user.id}/${imageId}`;

  if (imageId.startsWith("/CampaignCompanion")) {
    return imageId;
  } else if (await supabase.storage.from(BUCKET).exists(path)) {
    const image = await supabase.storage.from(BUCKET).getPublicUrl(path);
    return image.data.publicUrl;
  } else {
    throw new Error("No Image Found");
  }
};