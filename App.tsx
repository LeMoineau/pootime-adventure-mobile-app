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
    AppState.addEventListener("change", async (state) => {
      console.log("change", state);
      if (state === "inactive" || state === "background") {
        await saveCurrentStateInUser();
        console.log("saved!");
      }
    });
  }, []);

  return <Index></Index>;
}
