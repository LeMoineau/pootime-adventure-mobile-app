import { getApp } from "firebase/app";
import { DefaultValues } from "../../config/DefaultValues";
import UserData, { UserDataWithUid } from "../../types/firebase/UserData";
import {
  collection,
  doc,
  getDoc,
  getFirestore,
  limit,
  query,
  setDoc,
  orderBy,
  OrderByDirection,
  getDocs,
} from "firebase/firestore";

const firestore = getFirestore(getApp());

export function useUserDataTable() {
  const fetch = async (uid: string): Promise<UserData | undefined> => {
    const snap = await getDoc(doc(firestore, "user-data", uid));
    if (snap.exists()) {
      return snap.data() as UserData;
    }
    return;
  };

  const fetchManyOrderBy = async (
    _orderBy: string,
    _direction: OrderByDirection,
    _limit?: number
  ): Promise<UserDataWithUid[]> => {
    const q = query(
      collection(firestore, "user-data"),
      orderBy(_orderBy, _direction),
      limit(_limit ?? DefaultValues.FETCHING_LIMIT)
    );
    const snap = await getDocs(q);
    return snap.docs.map(
      (d) => d.exists() && { ...d.data(), uid: d.id }
    ) as UserDataWithUid[];
  };

  const update = async (uid: string, userData: UserData) => {
    await setDoc(doc(firestore, "user-data", uid), userData);
  };

  const create = async (uid: string, userData: UserData) => {
    console.log("creation new user");
    await update(uid, userData);
  };

  return { fetch, update, create, fetchManyOrderBy };
}
