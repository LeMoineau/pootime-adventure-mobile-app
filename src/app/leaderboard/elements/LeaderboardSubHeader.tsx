import { View } from "react-native";
import { style } from "../../../common/utils/style-utils";
import PooCreatureBadge from "../../../common/components/misc/poo-creature/PooCreatureBadge";
import StandardButton from "../../../common/components/buttons/StandardButton";
import { colors } from "../../../common/utils/color-utils";

export default function LeaderboardSubHeader() {
  return (
    <>
      <View style={[{ paddingVertical: 20 }]}>
        <View style={[style.flexRow, {}]}>
          <PooCreatureBadge
            size={100}
            border
            useBodyColorForBackground
          ></PooCreatureBadge>
          <View style={[{}]}>
            <StandardButton
              style={[{ flex: 1, width: 150, marginTop: 15 }]}
              bgColor={colors.green[500]}
              viewStyle={[style.roundedFull, { paddingVertical: 15 }]}
              textColor={colors.white}
              textStyle={[{ fontSize: 17, fontWeight: "500" }]}
              onPress={async () => {
                // const currentUser = getAuth().currentUser;
                // const token = await currentUser?.getIdToken();
                // console.log(token);
              }}
            >
              Coucou
            </StandardButton>
          </View>
        </View>
      </View>
    </>
  );
}
