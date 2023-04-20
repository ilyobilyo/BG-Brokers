import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../firebase";

export const uploadFile = (file) => {
    return new Promise((resolve, reject) => {
        const name = file.name == undefined ? 'eror.eror' : file.name.split('.')[0];
        const storageRef = ref(storage, name);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed',
            (snapshot) => {
                console.log(snapshot.state);
            }, (error) => {
                console.log(error);
                reject(error);
            }, () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    resolve(downloadURL);
                })
            })
    })
    
}

export const deleteFile = async (imgUrl) => {
    const imgRef = ref(storage, imgUrl)

    deleteObject(imgRef)
    .then(() => {
        console.log('deleted !');
    }).catch((error) => {
        throw new Error(error.message)
    });
}