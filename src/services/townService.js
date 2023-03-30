import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const townsRef = doc(db, "Towns", 'xuUdivejgeQAlVbykqso');

export async function GetAllTownsWithHoods() {
    const docSnap = await getDoc(townsRef);

    console.log(docSnap.data());

    return docSnap.data();
}