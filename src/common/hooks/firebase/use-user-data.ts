import { DefaultValues } from "../../config/DefaultValues";
import { useFirebase } from "../../stores/firebase/firebase.store";
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

export function useUserData() {
  const { getApp } = useFirebase();
  const bd = getFirestore(getApp());

  const getUserData = async (uid: string): Promise<UserData | undefined> => {
    const snap = await getDoc(doc(bd, "user-data", uid));
    if (snap.exists()) {
      return snap.data() as UserData;
    }
    return;
  };

  const getUserDatasOrderBy = async (
    _orderBy: string,
    _direction: OrderByDirection,
    _limit?: number
  ): Promise<UserDataWithUid[]> => {
    const q = query(
      collection(bd, "user-data"),
      orderBy(_orderBy, _direction),
      limit(_limit ?? DefaultValues.FETCHING_LIMIT)
    );
    const snap = await getDocs(q);
    return snap.docs.map(
      (d) => d.exists() && { ...d.data(), uid: d.id }
    ) as UserDataWithUid[];
  };

  const saveUserData = async (uid: string, userData: UserData) => {
    await setDoc(doc(bd, "user-data", uid), userData);
  };

  return { getUserData, saveUserData, getUserDatasOrderBy };
}
