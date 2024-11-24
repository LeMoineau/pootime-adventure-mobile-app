import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { FirebaseApp, initializeApp } from "firebase/app";
import { Auth, browserLocalPersistence, initializeAuth } from "firebase/auth";

type Store = {
  initApp: () => void;
  app?: FirebaseApp;
  auth?: Auth;
  getApp: () => FirebaseApp;
  getAuth: () => Auth;
};

export const useFirebase = create<Store>((set, get) => {
  const initApp = () => {
    // Your web app's Firebase configuration
    const firebaseConfig = {
      apiKey: "AIzaSyAVkMdbRsNZEnvlrSvzVVhNjUvYYU0qQd8",
      authDomain: "pootimeadventure.firebaseapp.com",
      projectId: "pootimeadventure",
      storageBucket: "pootimeadventure.firebasestorage.app",
      messagingSenderId: "159536626884",
      appId: "1:159536626884:web:cfe3e6845bbe9aae901d91",
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const auth = initializeAuth(app, {
      persistence: browserLocalPersistence,
    });

    set({ app, auth });
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
