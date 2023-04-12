import { collection, addDoc, query, orderBy, limit, getDocs, } from "firebase/firestore";
import { db } from "../firebase";
import { uploadFile } from "../utils/uploadImg";

export const createOffer = async (data) => {
    let offerImages = [];
    for (const file of data.images) {
        offerImages.push(await uploadFile(file))
    }

    data.images = offerImages;
    data.createdAt = new Date();

    const newDoc = await addDoc(collection(db, 'Offers'), data);

    data.id = newDoc.id;

    return data;
}

export const getAllOffers = async () => {
    const first = query(collection(db, "Offers"), orderBy("createdAt", "desc"), limit(25));
    const documentSnapshots = await getDocs(first);

    const data = documentSnapshots.docs.map(x => {
        const data = x.data();
        const obj = {id: x.id};
        for (const key in data) {
            if (data[key]) {
                obj[key] = data[key];
            }
        }

        return obj;
    })

    return data;
}