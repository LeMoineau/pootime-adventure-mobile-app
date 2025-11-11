import { FirebaseError } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  getAuth,
  linkWithCredential,
  onAuthStateChanged,
  signInAnonymously,
  signInWithEmailAndPassword,
  signOut,
  User,
  UserCredential,
} from "firebase/auth";
import { useEffect, useState } from "react";

const auth = getAuth();

export function useAuthentication() {
  const [user, setUser] = useState<User>();
  const [authError, setAuthError] = useState("");

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

  const createAnonymousAccount = async (onSuccess?: (user: User) => void) => {
    try {
      const userCredential = await signInAnonymously(auth);
      onSuccess && onSuccess(userCredential.user);
    } catch (e) {
      if (e instanceof FirebaseError) _handleAuthError(e.code);
    }
  };

  const createAccountWithEmailAndPassword = async (
    email: string,
    password: string,
    onSuccess?: (userCredential: UserCredential) => void,
    onFailed?: (err: FirebaseError) => void
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
          password
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

  const loginWithEmailAndPassword = async (
    email: string,
    password: string,
    onSuccess?: (userCredential: UserCredential) => void,
    onFailed?: (e: FirebaseError) => void
  ) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
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
