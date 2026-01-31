import { Text, View } from "react-native";
import { usePooCreatureStyleStore } from "../../../../stores/poo-creature-style.store";
import { style } from "../../../../constants/style/styles";
import PooCreatureBadge from "../../../common/misc/poo-creature/PooCreatureBadge";
import { colors } from "../../../../constants/style/colors";
import TextWithResourceIcon from "../../../common/text/TextWithResourceIcon";
import { useResourcesStore } from "../../../../stores/resources.store";
import GradeIcon from "../../../common/icons/grades/GradeIcon";

export default function PooCreatureTropheeSubHeader() {
  const name = usePooCreatureStyleStore((state) => state.name);
  const get = useResourcesStore((state) => state.get);

  return (
    <View style={[{ paddingVertical: 20, width: "100%" }]}>
      <View style={[style.flexRow, style.justifyCenter, { gap: 15 }]}>
        {/* <PooCreatureBadge
          size={100}
          useBodyColorForBackground
        ></PooCreatureBadge> */}
        <GradeIcon pooTrophees={get("pooTrophee")} height={80}></GradeIcon>
        <View style={[style.flexCol, style.justifyCenter]}>
          <Text
            style={[
              style.textLg,
              style.textBold,
              {
                color: colors.white,
                textShadowColor: colors.black,
                textShadowRadius: 3,
                textShadowOffset: { width: 0, height: 1 },
              },
            ]}
          >
            {name}
          </Text>
          <View style={[style.flexRow]}>
            <View
              style={[
                style.flexRow,
                style.border,
                {
                  flex: 0,
                  gap: 5,
                  backgroundColor: colors.gray[100],
                  borderColor: colors.gray[300],
                  borderRadius: 5,
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                },
              ]}
            >
              <TextWithResourceIcon
                style={{ justifyContent: "flex-start" }}
                resource="pooTrophee"
                text={get("pooTrophee")}
                textStyle={[
                  style.textBold,
                  {
                    fontSize: 15,
                    color: colors.black,
                  },
                ]}
              ></TextWithResourceIcon>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
