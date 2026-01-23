import axios from "axios";
import { colors } from "../../../constants/style/colors";
import { useAuthentication } from "../../common/firebase/use-authentification";

const MAILSENDER_API_URL = "https://mailsender-api-tan.vercel.app/mail";
const MAIL_TO = "faberbastian@gmail.com";
const MAIL_SUBJECT = "Commentaire PooTimeAdventures";
const MAIL_BODY = (uid: string, message: string) =>
  `<h2> Commentaire de ${uid} </h2> <div style="padding: 20px; background-color: ${colors.gray[100]}; border: solid 1px ${colors.gray[200]}; border-radius: 10px;"> ${message} </div>`;

export default function useMailsender() {
  const { user } = useAuthentication();

  const send = async ({
    to = MAIL_TO,
    subject = MAIL_SUBJECT,
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
        html: MAIL_BODY(user?.uid ?? "Inconnu", message),
      }),
    });
  };

  return { send };
}
