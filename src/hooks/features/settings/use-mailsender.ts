import axios from "axios";
import { colors } from "../../../constants/style/colors";
import { useAuthentication } from "../../common/firebase/use-authentification";

const MAILSENDER_API_URL = "https://mailsender-api-tan.vercel.app/mail";

export default function useMailsender() {
  const { user } = useAuthentication();

  const send = async ({
    to = "faberbastian@gmail.com",
    subject = "Commentaire PooTimeAdventures",
    message,
  }: {
    to?: string;
    subject?: string;
    message: string;
  }): Promise<void> => {
    return axios.request({
      method: "post",
      maxBodyLength: Infinity,
      url: MAILSENDER_API_URL,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        to,
        subject,
        html: `<h2> Commentaire de ${user?.uid} </h2> <div style="padding: 20px; background-color: ${colors.gray[100]}; border: solid 1px black; border-radius: 10px;"> ${message} </div>`,
      }),
    });
  };

  return { send };
}
