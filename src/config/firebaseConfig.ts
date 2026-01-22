import AsyncStorage from "@react-native-async-storage/async-storage";
import { getApp, getApps, initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { Platform } from "react-native";

const firebaseConfig = {
  apiKey: "AIzaSyAVkMdbRsNZEnvlrSvzVVhNjUvYYU0qQd8",
  authDomain: "pootimeadventure.firebaseapp.com",
  projectId: "pootimeadventure",
  storageBucket: "pootimeadventure.firebasestorage.app",
  messagingSenderId: "159536626884",
  appId: "1:159536626884:web:cfe3e6845bbe9aae901d91",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const auth = initializeAuth(app, {
  persistence:
    Platform.OS === "android"
      ? getReactNativePersistence(AsyncStorage)
      : undefined,
});

export const firestore = getFirestore(app);
export default app;
