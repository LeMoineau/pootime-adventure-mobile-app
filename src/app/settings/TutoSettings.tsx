import { Modal, ModalProps, Text, View } from "react-native";
import SettingsPage from "./elements/SettingsPage";
import SettingsHeader from "./elements/SettingsHeader";
import { style } from "../../common/utils/style-utils";
import PooUltiIcon from "../../common/components/icons/pooUlti";
import { useNavigation } from "@react-navigation/native";
import { useNavigationType } from "../../common/types/navigation/NavigationTypes";

export default function TutoSettings() {
  const navigator: useNavigationType = useNavigation();

  return (
    <>
      <SettingsPage
        header={
          <SettingsHeader
            title="Tutoriel"
            onPressBack={navigator.goBack}
          ></SettingsHeader>
        }
      >
        <PooUltiIcon style={[{ marginTop: 20 }]}></PooUltiIcon>
        <Text style={[style.textLg, style.textBold, { marginTop: 0 }]}>
          Coming soon...
        </Text>
      </SettingsPage>
    </>
  );
}
