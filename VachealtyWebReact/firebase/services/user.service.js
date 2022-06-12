import {collection, doc, getDoc, getDocs, query, where} from "firebase/firestore";
import {fireStore} from "../config";

export const userService = {
  getUserById: async (id) => {
    const ref = doc(fireStore, "users", id);
    const document = await getDoc(ref);
    return {
      id: document.id,
      ...document.data(),
    };
  },

  getUserByEmail: async (emailFromLogin) => {
    const q = query(
      collection(fireStore, "users"),
      where("email", "==", emailFromLogin)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((item) => ({
      id: item.id,
      ...item.data()
    }));
  },

  getUserVenues: async (user) => {
    const q = query(collection(fireStore, "venueConfigs"), where("adminIDs", "array-contains", user.id));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(item => ({
      id: item.id,
      ...item.data()
    }));
  },
};
