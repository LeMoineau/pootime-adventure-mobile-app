import { useEffect } from "react";
import "./src/common/config/firebaseConfig";
import Index from "./src/app/Index";

export default function App() {
  // const { initApp, getAuth, userIsPersisted } = useFirebase();
  // const { saveCurrentStateInUser, createAnonymousAccount } = useUserAuth();

  // console.log("salut app");

  // const saveCurrentStateWhenAppClosed = async () => {
  //   if (!getAuth().currentUser) return;
  //   await saveCurrentStateInUser();
  // };

  // useEffect(() => {
  //   initApp();
  //   userIsPersisted().then((userPersisted) => {
  //     if (!userPersisted) {
  //       createAnonymousAccount().then(async () => {
  //         await saveCurrentStateInUser();
  //       });
  //     }
  //   });
  //   return () => {
  //     console.log("fin");
  //     saveCurrentStateWhenAppClosed();
  //   };
  // }, []);

  return <Index></Index>;
}
