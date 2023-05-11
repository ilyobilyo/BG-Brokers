import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../firebase";

const hoodRef = collection(db, 'Hoods');

export async function GetHoodsForTown(townId) {
    const q = query(hoodRef, where("townId", "==", townId), orderBy("name"));

    const querySnapshot = await getDocs(q);

    const data = querySnapshot.docs.map(x => {
        const data = x.data();
        return {
            id: x.id,
            name: data.name,
            TownId: data.townId,
        }
    })

    console.log(data);
    
    return data
}