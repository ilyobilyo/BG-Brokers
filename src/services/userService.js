import { collection, getDocs, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export const getAllUsers = async () => {
    const querySnapshot = await getDocs(collection(db, 'UserData'));

    let data = querySnapshot.docs.map(x => {
        const data = x.data();

        return {
            id: x.id,
            name: `${data.firstName} ${data.lastName}`,
            email: data.email,
            phoneNumber: data.phoneNumber,
            town: data.town,
            roles: data.roles,
            resume: data.resume,
            img: data.img,
            isDeleted: data.isDeleted
        }
    })

    data = data.filter(x => x.isDeleted === false);

    return data;
}

export const getUserById = async (userId) => {
    const snap = await getDoc(doc(db, 'UserData', userId));

    if (snap.exists()) {
        return snap.data();
    } else {
        throw new Error('User does not exist');
    }

}

export const updateUser = async (userData) => {
    const userRef = doc(db, "UserData", userData.id);

    const dataToSaveInDb = {
        firstName: userData.firstName,
        lastName: userData.lastName,
        img: userData.img,
        town: userData.town,
        phoneNumber: userData.phoneNumber,
        roles: userData.roles.map(x => x.value),
    }

    await updateDoc(userRef, dataToSaveInDb);

    return userData;
}

export const getRoles = async () => {
    const querySnapshot = await getDocs(collection(db, 'Roles'));

    const data = querySnapshot.docs.map(x => {
        const data = x.data();

        return {
            value: data.name,
            label: data.name,
        }
    })

    return data;
}

export const deleteUser = async (userId) => {
    const userRef = doc(db, "UserData", userId);

    await updateDoc(userRef, {
        isDeleted: true,
    });
}