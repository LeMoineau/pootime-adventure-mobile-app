import { Text, View } from "react-native";
import { usePooCreatureStyleStore } from "../../../../../stores/poo-creature-style.store";
import { style } from "../../../../../utils/style-utils";
import PooCreatureBadge from "../PooCreatureBadge";
import { colors } from "../../../../../utils/color-utils";
import TextWithResourceIcon from "../../../text/TextWithResourceIcon";
import { useResourcesStore } from "../../../../../stores/resources.store";

export default function PooCreatureTropheeSubHeader() {
  const { name } = usePooCreatureStyleStore();
  const { get } = useResourcesStore();

  return (
    <View style={[{ paddingVertical: 20, width: "100%" }]}>
      <View style={[style.flexRow, style.justifyCenter, { gap: 10 }]}>
        <PooCreatureBadge
          size={100}
          useBodyColorForBackground
        ></PooCreatureBadge>
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
