import { arrayUnion, collection, doc, getDocs, updateDoc} from "firebase/firestore";
import { db } from "../firebase";

export async function GetAllTypes() {
    const querySnapshot = await getDocs(collection(db, 'Types'));

    const data = querySnapshot.docs.reduce((acc, cur) => {
        acc[cur.id] = cur.data().types;
        return acc;
    }, {});

    console.log(data);

    return data;
}

export async function CreateType(data) {
    const typeRef = doc(db, "Types", data.typeName);
    
    await updateDoc(typeRef, {
        types: arrayUnion({name: data.name})
    });
}