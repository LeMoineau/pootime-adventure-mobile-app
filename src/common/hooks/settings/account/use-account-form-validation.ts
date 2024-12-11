import { useState } from "react";
import { DefaultValues } from "../../../config/DefaultValues";

export default function useAccountFormValidation() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const isEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const validateEmail = (email: string) => {
    if (email.trim().length === 0) {
      setEmailError("Champ vide");
      return false;
    }
    if (!isEmail(email)) {
      setEmailError("Adresse mail invalide");
      return false;
    }
    if (email.trim().length > DefaultValues.MAX_LOGIN_FIELD_LENGTH) {
      setEmailError("Champ trop long");
      return false;
    }
    setEmailError("");
    return true;
  };

  const validatePassword = (password: string) => {
    if (password.trim().length === 0) {
      setPasswordError("Champ vide");
      return false;
    }
    if (password.trim().length < DefaultValues.MIN_PASSWORD_LENGTH) {
      setPasswordError("Mot de passe trop court");
      return false;
    }
    if (password.trim().length > DefaultValues.MAX_LOGIN_FIELD_LENGTH) {
      setPasswordError("Champ trop long");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const validateConfirmPassword = (confirmPassword: string) => {
    if (confirmPassword.trim().length === 0) {
      setConfirmPasswordError("Champ vide");
      return false;
    }
    if (confirmPassword.trim().length > DefaultValues.MAX_LOGIN_FIELD_LENGTH) {
      setConfirmPasswordError("Champ trop long");
      return false;
    }
    if (confirmPassword.trim() !== password.trim()) {
      setConfirmPasswordError("Mots de passe différent");
      return false;
    }
    setConfirmPasswordError("");
    return true;
  };

  const validateSignInForm = () => {
    const ok1 = validateEmail(email);
    const ok2 = validatePassword(password);
    return ok1 && ok2;
  };

  const validateRegisterForm = () => {
    const ok1 = validateEmail(email);
    const ok2 = validatePassword(password);
    const ok3 = validateConfirmPassword(confirmPassword);
    return ok1 && ok2 && ok3;
  };

  return {
    email,
    emailError,
    password,
    passwordError,
    confirmPassword,
    confirmPasswordError,
    setEmail,
    setPassword,
    setConfirmPassword,
    validateEmail,
    validatePassword,
    validateConfirmPassword,
    validateSignInForm,
    validateRegisterForm,
  };
}
