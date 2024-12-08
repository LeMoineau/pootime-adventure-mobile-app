import { useEffect } from "react";
import Index from "./src/app/Index";
import { useFirebase } from "./src/common/stores/firebase/firebase.store";
import { AppState } from "react-native";
import { useUserAuth } from "./src/common/hooks/firebase/use-user-auth";

export default function App() {
  const { initApp } = useFirebase();
  const { saveCurrentStateInUser } = useUserAuth();

  useEffect(() => {
    initApp();
    saveCurrentStateInUser().then(() => {
      AppState.addEventListener("change", async (state) => {
        if (state === "inactive" || state === "background") {
          await saveCurrentStateInUser();
          console.log("saved!");
        }
      });
    });
  }, []);

  return <Index></Index>;
}
