import { create } from "zustand";
import {
  FirebaseApp,
  getApps,
  getApp as getFirebaseApp,
  initializeApp,
} from "firebase/app";
import {
  Auth,
  initializeAuth,
  getAuth as getFireAuth,
  User,
  onAuthStateChanged,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { firebaseConfig } from "../../config/firebaseConfig";
import useStorage from "../../hooks/use-storage";
import { StorageKeys } from "../../config/StorageKeys";

type Store = {
  currentUser?: User;
  initApp: () => void;
  init?: boolean;
  getApp: () => FirebaseApp;
  getAuth: () => Auth;
  userIsPersisted: () => Promise<boolean>;
  syncCurrentUser: (user?: User) => void;
};

export const useFirebase = create<Store>((set, get) => {
  const { saveBoolean, getBoolean } = useStorage();

  const initApp = () => {
    // console.log("init app 1", getApps());
    // const app = initializeApp(firebaseConfig);
    // if (getApps().length === 0) {
    //   console.log("init app 2");
    //   try {
    //     const auth = initializeAuth(app, {
    //       persistence: getReactNativePersistence(AsyncStorage),
    //     });
    //     onAuthStateChanged(auth, async (user) => {
    //       set({ currentUser: user ?? undefined });
    //       await saveBoolean(StorageKeys.USER_IS_PERSISTED, user !== null);
    //     });
    //     set({ init: true });
    //     console.log("init app");
    //   } catch (e) {
    //     console.error("error find when trying initializing : ", e);
    //   }
    // }
  };

  const getApp = () => {
    const { init } = get();
    if (!init) {
      initApp();
    }
    return getFirebaseApp();
  };

  const getAuth = () => {
    const { init } = get();
    if (!init) {
      initApp();
    }
    return getFireAuth();
  };

  const userIsPersisted = async () => {
    return (await getBoolean(StorageKeys.USER_IS_PERSISTED)) === true;
  };

  const syncCurrentUser = (user?: User) => {
    set({ currentUser: user ?? getAuth().currentUser ?? undefined });
  };

  return {
    currentUser: undefined,
    initApp,
    getApp,
    getAuth,
    userIsPersisted,
    syncCurrentUser,
  };
});
