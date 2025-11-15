import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { Platform } from "react-native";

const firebaseConfig = {
  apiKey: "AIzaSyAVkMdbRsNZEnvlrSvzVVhNjUvYYU0qQd8",
  authDomain: "pootimeadventure.firebaseapp.com",
  projectId: "pootimeadventure",
  storageBucket: "pootimeadventure.firebasestorage.app",
  messagingSenderId: "159536626884",
  appId: "1:159536626884:web:cfe3e6845bbe9aae901d91",
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence:
    Platform.OS === "android"
      ? getReactNativePersistence(AsyncStorage)
      : undefined,
});

export default app;
