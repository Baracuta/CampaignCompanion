
export const uploadImage = (img: string): Promise<string> =>{
    // generate id with uuid
    //put image in indexeddb with the key as that uuid
    //return the uuid
}

export const getImage = (imageId: string): Promise<string> => {
    // look for the image in indexeddb
    // return the image
}