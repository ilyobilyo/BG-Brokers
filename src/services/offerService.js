import { collection, addDoc, query, orderBy, limit, getDocs, updateDoc, doc, deleteDoc, where, startAfter, getDoc } from "firebase/firestore";
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

export const getAllOffers = async (lastDoc, filters) => {
    let q = buildQuery(filters, lastDoc);

    const documentSnapshots = await getDocs(q);

    return documentSnapshots;
}

export const getOfferById = async (offerId) => {
    const docRef = doc(db, "Offers", offerId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        console.log("No such document!");
    }
}

export const updateOffer = async (offerId, data) => {
    try {
        let images = [];

        for (const file of data.images) {
            if (typeof file !== 'string') {
                images.push(await uploadFile(file))
            } else {
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

export const getUserOffers = async (userId) => {
    const offersRef = collection(db, "Offers");

    const q = query(offersRef, where("broker.id", "==", userId));

    const documentSnapshots = await getDocs(q);

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

const buildQuery = (filters, lastDoc) => {
    let q = query(collection(db, "Offers"));

    for (const filterKey in filters || {}) {
        const filterValue = filters[filterKey];

        if (filterKey === 'priceFrom' && filterValue !== '') {
            q = query(q, where('price', '>=', Number(filterValue)));
        } else if (filterKey === 'priceTo' && filterValue !== '') {
            q = query(q, where('price', '<=', Number(filterValue)));
        } else if (filterKey === 'area' && filterValue !== '') {
            q = query(q, where('area', '==', Number(filterValue)));
        } else if (filterValue !== '') {
            q = query(q, where(filterKey, '==', filterValue));
        }
    }

    if (filters) {
        q = query(q, orderBy("price"), orderBy("createdAt", "desc"));
    } else {
        q = query(q, orderBy("createdAt", "desc"));
    }

    if (lastDoc && Object.keys(lastDoc).length > 0) {
        q = query(q, startAfter(lastDoc));
    }

    q = query(q, limit(6));


    return q;
}