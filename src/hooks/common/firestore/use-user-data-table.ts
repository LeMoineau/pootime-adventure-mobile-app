import { DefaultValues } from "../../../config/DefaultValues";
import UserData, { IdentifiedUserData } from "../../../types/firebase/UserData";
import {
  collection,
  doc,
  getDoc,
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
import { useContext, useState } from "react";
import { CacheContext } from "../../../contexts/contexts";
import { firestore } from "../../../config/firebaseConfig";

export function useUserDataTable() {
  const { get: getFromCache, put: putInCache } = useContext(CacheContext);
  const [loading, setLoading] = useState(false);

  /**
   * Get the specified user data by its id and save it in cache
   * @param uid user data id
   * @param forceRefresh force the request and save the new value in cache
   * @returns UserData if find, else undefined
   */
  const get = async (
    uid: string,
    forceRefresh?: boolean,
  ): Promise<IdentifiedUserData | undefined> => {
    const cacheKey = `get:user-data:${uid}`;
    const cachedResponse = getFromCache(cacheKey);

    if (!!cachedResponse && !!!forceRefresh) {
      return cachedResponse;
    } else {
      setLoading(true);
      const snap = await getDoc(doc(firestore, "user-data", uid));
      setLoading(false);
      if (snap.exists()) {
        const response = { ...(snap.data() as UserData), uid };
        putInCache(cacheKey, response);
        return response;
      }
    }
  };

  const fetch = async (props?: {
    wheres?: [{ fieldPath: string; operator: WhereFilterOp; value: any }];
    orderBy?: { fieldPath: string; direction: OrderByDirection };
    limit?: number;
    forceRefresh?: boolean;
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
          orderBy(props.orderBy.fieldPath, props.orderBy.direction),
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

    if (cachedResponse && !!!props?.forceRefresh) {
      return cachedResponse;
    } else {
      const q = query(collection(firestore, "user-data"), ...constraints);
      setLoading(true);
      const snap = await getDocs(q);
      setLoading(false);
      const response = snap.docs.map(
        (d) => d.exists() && { ...d.data(), uid: d.id },
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
      setLoading(true);
      const snap = await getCountFromServer(
        query(collection(firestore, "user-data"), ...constraints),
      );
      setLoading(false);
      const nb = snap.data().count;
      putInCache(cacheKey, nb);
      return nb;
    }
  };

  return { loading, get, update, create, fetch, count: _count };
}
