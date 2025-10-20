import { ReactNode, useEffect } from "react";
import { FirebaseAuthContext } from "./contexts";
import { useFirebase } from "../stores/firebase/firebase.store";
import { useUserAuth } from "../hooks/firebase/use-user-auth";

export default function FirebaseAuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { initApp, getAuth, userIsPersisted } = useFirebase();
  const { saveCurrentStateInUser, createAnonymousAccount } = useUserAuth();

  const saveCurrentStateWhenAppClosed = async () => {
    if (!getAuth().currentUser) return;
    await saveCurrentStateInUser();
  };

  useEffect(() => {
    initApp();
    userIsPersisted().then((userPersisted) => {
      if (!userPersisted) {
        createAnonymousAccount().then(async () => {
          await saveCurrentStateInUser();
        });
      }
    });
    return () => {
      console.log("coucou");
      saveCurrentStateWhenAppClosed();
    };
  }, []);

  return (
    <FirebaseAuthContext.Provider value={{}}>
      {children}
    </FirebaseAuthContext.Provider>
  );
}
