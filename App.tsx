import { useEffect } from "react";
import Index from "./src/app/Index";
import { useFirebase } from "./src/common/stores/firebase/firebase.store";
import { AppState, AppStateStatus } from "react-native";
import { useUserAuth } from "./src/common/hooks/firebase/use-user-auth";
import useStorage from "./src/common/hooks/use-storage";

export default function App() {
  const { currentUser, initApp, getAuth, userIsPersisted } = useFirebase();
  const { saveCurrentStateInUser, createAnonymousAccount } = useUserAuth();
  const { getJson } = useStorage();

  const saveCurrentStateWhenAppClosed = async (state: AppStateStatus) => {
    if (!getAuth().currentUser) return;
    if (state === "inactive" || state === "background") {
      await saveCurrentStateInUser();
    }
  };

  useEffect(() => {
    initApp();
    userIsPersisted().then((userPersisted) => {
      if (!userPersisted) {
        createAnonymousAccount().then(async () => {
          await saveCurrentStateInUser();
        });
      }
      AppState.addEventListener("change", saveCurrentStateWhenAppClosed);
    });
  }, []);

  return <Index></Index>;
}
