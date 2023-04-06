import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export const getAllUsers = async () => {
    const querySnapshot = await getDocs(collection(db, 'UserData'));

    const data = querySnapshot.docs.map(x => {
        const data = x.data();
        return {
            id: x.id,
            name: `${data.firstName} ${data.lastName}`,
            email: data.email,
            phoneNumber: data.phoneNumber,
            town: data.town,
            roles: data.roles
        }
    })

    return data;
}