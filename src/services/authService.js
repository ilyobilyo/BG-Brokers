import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { uploadFile } from "../utils/uploadImg";

export const register = (email, password, firstName, lastName, phoneNumber, town, img) => {
    return createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) =>  {
            
            let data = {
                email: userCredential.user.email,
                firstName,
                lastName,
                phoneNumber,
                town,
                roles: ['user'],
                isDeleted: false
            }
            
            data.img = await uploadFile(img)
            
            setDoc(doc(db, "UserData", userCredential.user.uid), data);

            data.id = userCredential.user.uid;
            data.accessToken = userCredential.user.accessToken;

            return data;
        })
        .catch((error) => {
            throw new Error(error);
        });
}

export const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            const docRef = doc(db, "UserData", userCredential.user.uid);
            const docSnap = await getDoc(docRef);
            const docData = docSnap.data();

            const userData = {
                id: userCredential.user.uid,
                accessToken: userCredential.user.accessToken,
                email: userCredential.user.email,
                firstName: docData.firstName,
                lastName: docData.lastName,
                phoneNumber: docData.phoneNumber,
                town: docData.town,
                roles: docData.roles,
                img: docData.img,
                isDeleted: docData.isDeleted
            };

            return userData;
        })
        .catch((error) => {
            throw new Error(error);
        });
}

export const logout = () => {
    return signOut(auth)
        .then(() => {
            return true;
        }).catch((error) => {
            throw new Error(error);
        });
}
