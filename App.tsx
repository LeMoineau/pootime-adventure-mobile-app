import { useEffect } from "react";
import Index from "./src/app/Index";
import { useFirebase } from "./src/common/stores/firebase/firebase.store";
import { useUserData } from "./src/common/hooks/firebase/use-user-data";

export default function App() {
  const { initApp } = useFirebase();
  const { signInAnonymous } = useUserData();

  useEffect(() => {
    initApp();
    signInAnonymous();
  }, []);

  return <Index></Index>;
}
