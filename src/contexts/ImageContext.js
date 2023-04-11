import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { createContext, useState } from "react";
import { storage } from "../firebase";

export const ImageContext = createContext();

export const ImageProvider = ({ children }) => {

    const uploadFile = (file) => {
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

    return (
        <ImageContext.Provider value={{uploadFile }}>
            {children}
        </ImageContext.Provider>
    )
}
