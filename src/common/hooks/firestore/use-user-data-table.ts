import { getApp } from "firebase/app";
import { DefaultValues } from "../../config/DefaultValues";
import UserData, { IdentifiedUserData } from "../../types/firebase/UserData";
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
  QueryConstraint,
  where,
  WhereFilterOp,
  getCountFromServer,
} from "firebase/firestore";
import { useContext } from "react";
import { CacheContext } from "../../contexts/contexts";

const firestore = getFirestore(getApp());

export function useUserDataTable() {
  const { get: getFromCache, put: putInCache } = useContext(CacheContext);

  /**
   * Get the specified user data by its id
   * @param uid user data id
   * @returns UserData if find, else undefined
   */
  const get = async (uid: string): Promise<UserData | undefined> => {
    const snap = await getDoc(doc(firestore, "user-data", uid));
    if (snap.exists()) {
      return snap.data() as UserData;
    }
    return;
  };

  const fetch = async (props?: {
    wheres?: [{ fieldPath: string; operator: WhereFilterOp; value: any }];
    orderBy?: { fieldPath: string; direction: OrderByDirection };
    limit?: number;
  }): Promise<IdentifiedUserData[]> => {
    let constraints: QueryConstraint[] = [];

    if (props) {
      if (props.wheres) {
        for (let w of props.wheres) {
          constraints.push(where(w.fieldPath, w.operator, w.value));
        }
      }
      if (props.orderBy) {
        constraints.push(
          orderBy(props.orderBy.fieldPath, props.orderBy.direction)
        );
      }
    }

    if (props && props.limit) {
      constraints.push(limit(props.limit));
    } else {
      constraints.push(limit(DefaultValues.FETCHING_LIMIT));
    }

    const cacheKey = JSON.stringify(constraints);
    const cachedResponse = getFromCache(cacheKey);

    if (cachedResponse) {
      return cachedResponse;
    } else {
      const q = query(collection(firestore, "user-data"), ...constraints);
      const snap = await getDocs(q);
      const response = snap.docs.map(
        (d) => d.exists() && { ...d.data(), uid: d.id }
      ) as IdentifiedUserData[];
      putInCache(cacheKey, response);
      return response;
    }
  };

  const update = async (uid: string, userData: UserData) => {
    await setDoc(doc(firestore, "user-data", uid), userData);
  };

  const create = async (uid: string, userData: UserData) => {
    console.log("creation new user");
    await update(uid, userData);
  };

  const _count = async (props?: {
    wheres?: [{ fieldPath: string; operator: WhereFilterOp; value: any }];
  }): Promise<number> => {
    let constraints: QueryConstraint[] = [];

    if (props) {
      if (props.wheres) {
        for (let w of props.wheres) {
          constraints.push(where(w.fieldPath, w.operator, w.value));
        }
      }
    }

    const cacheKey = `count:user-data:` + JSON.stringify(constraints);
    const cachedResponse = getFromCache(cacheKey);

    if (cachedResponse !== undefined) {
      return cachedResponse;
    } else {
      const snap = await getCountFromServer(
        query(collection(firestore, "user-data"), ...constraints)
      );
      const nb = snap.data().count;
      putInCache(cacheKey, nb);
      return nb;
    }
  };

  return { get, update, create, fetch, count: _count };
}
