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
  getReactNativePersistence,
  getAuth as getFireAuth,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { firebaseConfig } from "../../config/firebaseConfig";

type Store = {
  initApp: () => void;
  init?: boolean;
  getApp: () => FirebaseApp;
  getAuth: () => Auth;
};

export const useFirebase = create<Store>((set, get) => {
  const initApp = () => {
    if (getApps().length === 0) {
      try {
        const app = initializeApp(firebaseConfig);
        initializeAuth(app, {
          persistence: getReactNativePersistence(AsyncStorage),
        });

        set({ init: true });
      } catch (e) {
        console.error("error find when trying initializing : ", e);
      }
    }
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

  return {
    initApp,
    getApp,
    getAuth,
  };
});
