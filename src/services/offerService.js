import { collection, addDoc, query, orderBy, limit, getDocs, updateDoc, doc, deleteDoc, } from "firebase/firestore";
import { db } from "../firebase";
import { deleteFile, uploadFile } from "../utils/uploadImg";

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
        const obj = { id: x.id };
        for (const key in data) {
            if (data[key]) {
                obj[key] = data[key];
            }
        }

        return obj;
    })

    return data;
}

export const updateOffer = async (offerId, data) => {
    try {
        let images = [];

        for (const file of data.images) {
            if (typeof file !== 'string') {
                images.push(await uploadFile(file))
            } else{
                images.push(file)
            }
        }

        data.images = images

        const offerRef = doc(db, "Offers", offerId);

        await updateDoc(offerRef, data);

        return data;
    } catch (error) {
        throw new Error(error.message)
    }
}

export const deleteOffer = async (offer) => {
    for (const img of offer.images) {
        deleteFile(img);
    }

    await deleteDoc(doc(db, 'Offers', offer.id))
}