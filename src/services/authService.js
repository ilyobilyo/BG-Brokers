import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";



export const register = (email, password, firstName, lastName, phoneNumber, town) => {
    return createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const data = {
                email: userCredential.user.email,
                firstName,
                lastName,
                phoneNumber,
                town
            }
            setDoc(doc(db, "UserData", userCredential.user.uid), data);

            data.id = userCredential.user.uid;
            data.accessToken = userCredential.user.accessToken;

            return data;
        })
        .catch((error) => {
            throw new Error(error);
        });
}