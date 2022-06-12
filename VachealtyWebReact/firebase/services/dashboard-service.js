import {collection, getDocs, query, where, orderBy, limit, addDoc,
    doc, setDoc, updateDoc, getDoc} from "firebase/firestore";
import {fireStore, storage } from "../config";
import {getDaysBeforeRange} from "../../utils/date";
import { ref, uploadBytes,getDownloadURL  } from "firebase/storage";

const EVENTS_COLLECTION = 'users';
export const dashboardService = {

    getUsers: async () => {
        const querySnapshot = await getDocs(collection(fireStore, EVENTS_COLLECTION));
        return querySnapshot.docs.map((item) => ({
            id: item.id,
            ...item.data()
        }));

    },

}
