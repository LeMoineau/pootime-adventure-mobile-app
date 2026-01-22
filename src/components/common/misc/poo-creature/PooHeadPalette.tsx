import { View } from "react-native";
import { style } from "../../../../utils/style-utils";
import { ArrayUtils } from "../../../../utils/array-utils";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";
import { colors } from "../../../../utils/color-utils";

export default function PooHeadPalette({
  palette,
  resolution,
  addMarkerOn,
  ...props
}: {
  palette: any;
  resolution?: number;
  addMarkerOn?: number;
} & ViewProps) {
  return (
    <View {...props}>
      <View
        style={[
          style.flexRow,
          style.hFull,
          { flex: 1, flexWrap: "nowrap", backgroundColor: colors.black },
        ]}
      >
        {ArrayUtils.createArray(resolution ? resolution - 1 : 99).map(
          (value) => (
            <View
              key={value}
              style={[
                style.hFull,
                style.border,
                {
                  flexGrow: 1,
                  backgroundColor: `${palette.hexValueAt(
                    (value + 1) / (resolution ? resolution - 1 : 99),
                  )}`,
                  borderWidth: 3,
                  borderColor:
                    value === addMarkerOn
                      ? colors.red[500]
                      : colors.transparent,
                },
              ]}
            ></View>
          ),
        )}
      </View>
    </View>
  );
}
