import {collection, getDocs, query, where, orderBy, limit,} from "firebase/firestore";
import {fireStore} from "../config";

const EVENTS_COLLECTION = 'userCovidProcess';
export const covidProcessService = {

    getUsersProcess: async () => {
        const querySnapshot = await getDocs(collection(fireStore, EVENTS_COLLECTION));
        return querySnapshot.docs.map((item) => ({
            id: item.id,
            ...item.data()
        }));

    },

}
