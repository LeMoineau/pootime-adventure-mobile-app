import { useEffect } from "react";
import { useAuthentication } from "../firebase/use-authentification";

export const useLeaderboardTable = () => {
  const { user } = useAuthentication();

  useEffect(() => {
    console.log("new user in leadboard", user);
  }, [user]);

  return {};
};
