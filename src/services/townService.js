import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export async function GetAllTowns() {
    const querySnapshot = await getDocs(collection(db, 'Towns'));

    const data = querySnapshot.docs.map(x => {
        const data = x.data();
        return {
            id: x.id,
            name: data.name,
            hoods: data.hoods
        }
    })

    console.log(data);

    return data;
}

