import { useFirebase } from "../../stores/firebase/firebase.store";
import { getAuth, signInAnonymously } from "firebase/auth";

export function useUserData() {
  const { getApp } = useFirebase();

  const signInAnonymous = async () => {
    const auth = getAuth();
    if (!auth.currentUser) {
      await signInAnonymously(auth).then((...args) => {
        console.log(args, "new user created!");
      });
    } else {
      console.log("old user");
    }
  };

  return { signInAnonymous };
}
