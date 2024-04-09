import { Text, View } from "react-native";
import CustomPage from "../../common/components/navigation/CustomPage";
import { colors } from "../../common/utils/color-utils";
import {
  StructureName,
  Structures,
} from "../../common/config/game-data/Structures";
import StructureView from "./elements/StructureView";
import { style } from "../../common/utils/style-utils";
import InputField from "../../common/components/fields/InputField";

export default function VillagePage() {
  return (
    <>
      <CustomPage bgColor={colors.baseBackgroundColor}>
        <View
          style={[
            style.rounded,
            style.overflowHidden,
            { flex: 1, backgroundColor: colors.green[500], margin: 20 },
          ]}
        >
          {Object.keys(Structures).map((key, index) => {
            const structureName = key as StructureName;
            const structure = Structures[structureName];
            return (
              <StructureView
                key={`structure-${key}-${index}`}
                position={structure.style.position}
                size={structure.style.size}
              ></StructureView>
            );
          })}
          <InputField style={[{ backgroundColor: "transparent" }]}></InputField>
          <Text
            style={[
              style.textCenter,
              {
                position: "absolute",
                bottom: 20,
                left: 0,
                width: "100%",
                fontSize: 25,
                fontWeight: "700",
                letterSpacing: 2,
                color: colors.green[400],
                transform: [{ rotateX: "0deg" }, { rotateY: "0deg" }],
              },
            ]}
          >
            Votre village
          </Text>
        </View>
      </CustomPage>
    </>
  );
}
