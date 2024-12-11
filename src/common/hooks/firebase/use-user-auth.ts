import {
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  linkWithCredential,
  signInAnonymously,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
} from "firebase/auth";
import { useUserData } from "./use-user-data";
import { useFirebase } from "../../stores/firebase/firebase.store";
import { useState } from "react";
import { FirebaseError } from "firebase/app";
import useMassiveStoreLoader from "../admin/user-massive-store-loader";

export function useUserAuth() {
  const { saveUserData } = useUserData();
  const { getAuth, currentUser, syncCurrentUser } = useFirebase();
  const { generateUserDataFromStores } = useMassiveStoreLoader();

  const [authError, setAuthError] = useState("");

  const _handleAuthError = (code: string) => {
    console.error(code);
    if (code === "auth/invalid-credential") {
      setAuthError("Adresse mail ou mot de passe incorrect");
    } else if (code === "auth/email-already-in-use") {
      setAuthError("Cette adresse mail a déjà été utilisée");
    } else {
      setAuthError("Erreur lors de l'authentification");
    }
  };

  /**
   * Save the current state (described by stores) in the current user logged in.
   *
   * If user is not yet logged, will not save
   */
  const saveCurrentStateInUser = async () => {
    if (!currentUser) return;
    try {
      const userData = generateUserDataFromStores();
      await saveUserData(currentUser.uid, userData);
    } catch (e) {
      console.error("error while saving current state in user", e);
    }
  };

  const createAnonymousAccount = async () => {
    try {
      await signInAnonymously(getAuth());
    } catch (e) {
      if (e instanceof FirebaseError) _handleAuthError(e.code);
    }
  };

  const disconnect = async () => {
    await signOut(getAuth());
  };

  const createAccountWithEmailAndPassword = async (
    email: string,
    password: string,
    onSuccess?: (userCredential: UserCredential) => void
  ) => {
    try {
      if (currentUser && currentUser.isAnonymous) {
        const credential = EmailAuthProvider.credential(email, password);
        const userCredential = await linkWithCredential(
          currentUser,
          credential
        );
        syncCurrentUser(userCredential.user);
        onSuccess && onSuccess(userCredential);
      } else {
        const userCredential = await createUserWithEmailAndPassword(
          getAuth(),
          email,
          password
        );
        onSuccess && onSuccess(userCredential);
      }
    } catch (e) {
      if (e instanceof FirebaseError) _handleAuthError(e.code);
    }
  };

  const connectWithEmailAndPassword = async (
    email: string,
    password: string,
    onSuccess?: (userCredential: UserCredential) => void
  ) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        getAuth(),
        email,
        password
      );
      onSuccess && onSuccess(userCredential);
    } catch (e) {
      if (e instanceof FirebaseError) _handleAuthError(e.code);
    }
  };

  return {
    authError,
    createAnonymousAccount,
    saveCurrentStateInUser,
    disconnect,
    createAccountWithEmailAndPassword,
    connectWithEmailAndPassword,
  };
}
