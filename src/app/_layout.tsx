import "../config/firebaseConfig";

import { SafeAreaView } from "react-native-safe-area-context";
import CacheProvider from "../common/contexts/CacheProvider";
import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import useMassiveStoreLoader from "../common/hooks/admin/user-massive-store-loader";
import { useUserDataTable } from "../common/hooks/firestore/use-user-data-table";
import { useAuthentication } from "../common/hooks/firebase/use-authentification";
import { useEffect } from "react";
import { AppState } from "react-native";

export default function Layout() {
  const { generateUserDataFromStores } = useMassiveStoreLoader();
  const { update: updateUserData } = useUserDataTable();
  const { user } = useAuthentication();

  const handleStateChange = (appState: string) => {
    if (appState.match(/inactive|background/) && user && !__DEV__) {
      updateUserData(user.uid, generateUserDataFromStores());
      console.log("saved");
    }
  };

  useEffect(() => {
    if (user) {
      const listener = AppState.addEventListener("change", handleStateChange);

      return () => {
        listener.remove();
      };
    }
  }, [user]);

  return (
    <SafeAreaView edges={{ top: "off", bottom: "off" }} style={[{ flex: 1 }]}>
      <StatusBar hidden />
      <CacheProvider>
        <Stack initialRouteName="(tabs)" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen
            name="village"
            options={{
              presentation: "transparentModal",
              animation: "slide_from_bottom",
            }}
          ></Stack.Screen>
        </Stack>
      </CacheProvider>
    </SafeAreaView>
  );
}
