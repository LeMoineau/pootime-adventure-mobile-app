import { useEffect } from "react";
import "./src/common/config/firebaseConfig";
import Index from "./src/app/Index";
import { AppState } from "react-native";
import useMassiveStoreLoader from "./src/common/hooks/admin/user-massive-store-loader";
import { useUserDataTable } from "./src/common/hooks/firestore/use-user-data-table";
import { useAuthentication } from "./src/common/hooks/firebase/use-authentification";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
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
    <SafeAreaProvider>
      <Index></Index>
    </SafeAreaProvider>
  );
}
