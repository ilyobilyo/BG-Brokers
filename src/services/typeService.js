import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const typesRef = doc(db, "Types", 'c7i447y51jobjHdcLjWS');

export async function GetAllTypes() {
    const docSnap = await getDoc(typesRef);

    console.log(docSnap.data());

    return docSnap.data();
}