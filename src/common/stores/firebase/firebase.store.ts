import { create } from "zustand";
import {
  FirebaseApp,
  FirebaseError,
  getApps,
  initializeApp,
} from "firebase/app";
import { Auth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { firebaseConfig } from "../../config/firebaseConfig";

type Store = {
  initApp: () => void;
  app?: FirebaseApp;
  auth?: Auth;
  getApp: () => FirebaseApp;
  getAuth: () => Auth;
};

export const useFirebase = create<Store>((set, get) => {
  const initApp = () => {
    if (getApps().length === 0) {
      try {
        const app = initializeApp(firebaseConfig);
        const auth = initializeAuth(app, {
          persistence: getReactNativePersistence(AsyncStorage),
        });

        set({ app, auth });
      } catch (e) {
        console.error("error find when trying initializing : ", e);
      }
    }
  };

  const getApp = () => {
    const { app } = get();
    if (!app) {
      initApp();
    }
    return get().app!;
  };

  const getAuth = () => {
    const { auth } = get();
    if (!auth) {
      initApp();
    }
    return get().auth!;
  };

  return {
    initApp,
    getApp,
    getAuth,
  };
});
