import { FirebaseError } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  linkWithCredential,
  onAuthStateChanged,
  signInAnonymously,
  signInWithEmailAndPassword,
  signOut,
  User,
  UserCredential,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { useUserDataTable } from "../firestore/use-user-data-table";
import useMassiveStoreLoader from "../admin/user-massive-store-loader";
import { auth } from "../../config/firebaseConfig";

export function useAuthentication() {
  const [user, setUser] = useState<User>();
  const [authError, setAuthError] = useState("");
  const { create: createUserData, get: getUserData } = useUserDataTable();
  const { generateUserDataFromStores, massiveLoadFromUserData } =
    useMassiveStoreLoader();

  useEffect(() => {
    const unsubscribeFromAuthStatuChanged = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(undefined);
      }
    });

    return unsubscribeFromAuthStatuChanged;
  }, []);

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
   * Créer un compte anonyme et créér un UserData associé
   */
  const createAnonymousAccount = async (onSuccess?: (user: User) => void) => {
    try {
      const userCredential = await signInAnonymously(auth);
      await createUserData(
        userCredential.user.uid,
        generateUserDataFromStores(),
      );
      onSuccess && onSuccess(userCredential.user);
    } catch (e) {
      if (e instanceof FirebaseError) _handleAuthError(e.code);
    }
  };

  /**
   * Créer un nouveau compte a partir d'une adresse mail et d'un mot de passe.
   *
   * - Si le compte est créé en étant déjà connecté anonymement, va lié le compte anonyme
   * au nouveau compte créer.
   * - Sinon, un nouvel UserData va être créé pour ce compte
   */
  const createAccountWithEmailAndPassword = async (
    email: string,
    password: string,
    onSuccess?: (userCredential: UserCredential) => void,
    onFailed?: (err: FirebaseError) => void,
  ) => {
    try {
      if (user && user.isAnonymous) {
        const credential = EmailAuthProvider.credential(email, password);
        const userCredential = await linkWithCredential(user, credential);
        onSuccess && onSuccess(userCredential);
      } else {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password,
        );
        await createUserData(
          userCredential.user.uid,
          generateUserDataFromStores(),
        );
        onSuccess && onSuccess(userCredential);
      }
    } catch (e) {
      if (e instanceof FirebaseError) {
        _handleAuthError(e.code);
        onFailed && onFailed(e);
      }
    }
  };

  /**
   * Se connecte à partir d'une adresse mail et d'un mot de passe.
   *
   * A la connexion, va également chercher le UserData associé puis le charger
   */
  const loginWithEmailAndPassword = async (
    email: string,
    password: string,
    onSuccess?: (userCredential: UserCredential) => void,
    onFailed?: (e: FirebaseError) => void,
  ) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const userData = await getUserData(userCredential.user.uid);
      if (userData) {
        massiveLoadFromUserData(userData);
      }
      onSuccess && onSuccess(userCredential);
    } catch (e) {
      if (e instanceof FirebaseError) {
        _handleAuthError(e.code);
        onFailed && onFailed(e);
      }
    }
  };

  const disconnect = async () => {
    await signOut(auth);
  };

  return {
    user,
    isConnected: !!user,
    isAnonymous: !!(user && user.isAnonymous),
    isSynched: !!(user && !user.isAnonymous),
    authError,
    createAnonymousAccount,
    createAccountWithEmailAndPassword,
    loginWithEmailAndPassword,
    disconnect,
  };
}
