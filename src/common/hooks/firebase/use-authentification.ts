import { FirebaseError } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  signInAnonymously,
  signOut,
  User,
} from "firebase/auth";
import { useEffect, useState } from "react";

const auth = getAuth();

export function useAuthentication() {
  const [user, setUser] = useState<User>();
  const [authError, setAuthError] = useState("");

  useEffect(() => {
    const unsubscribeFromAuthStatuChanged = onAuthStateChanged(auth, (user) => {
      console.log("user", user);
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

  const createAnonymousAccount = async () => {
    try {
      await signInAnonymously(auth);
    } catch (e) {
      if (e instanceof FirebaseError) _handleAuthError(e.code);
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
    disconnect,
  };
}
