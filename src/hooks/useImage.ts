import { useState, useEffect } from "react";
import { getImage } from "../services/ImageService";



export const useImage = (imageId: string) => {
    const [image, setImage] = useState<string>();

    useEffect(() => {
        getImage(imageId).then((image) => {
            setImage(image);
        })
    }, [imageId]);

    return image as string;
};