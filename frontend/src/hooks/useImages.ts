import { useState, useEffect } from "react";
import { getImage } from "../services/ImageService";


export const useImages = (imageArray?: Array<string>) => {
    
    const [images, setImages] = useState<{ [imageId: string]: string }>({});
    useEffect(() => {
        if (imageArray != null){
        imageArray
            ?.filter((imageId) => !images[imageId])
            ?.forEach((imageId) => getImage(imageId).then((image) => {
                setImages({ ...images, [imageId]: image })
            })
        )
    }}, [imageArray, images]);

    return images;
}