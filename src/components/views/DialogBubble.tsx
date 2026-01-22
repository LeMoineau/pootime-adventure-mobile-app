import { DimensionValue, StyleProp, View, ViewStyle } from "react-native";
import Triangle from "react-native-triangle";
import { colors } from "../../utils/color-utils";
import { style } from "../../utils/style-utils";

export default function DialogBubble({
  direction,
  trianglePosition,
  children,
  viewStyle,
}: {
  direction: "up" | "down";
  trianglePosition?: [DimensionValue, DimensionValue];
  children?: React.ReactNode;
  viewStyle?: StyleProp<ViewStyle>;
}) {
  return (
    <>
      <View style={[style.flexRow, viewStyle]}>
        <View
          style={[
            style.flexCol,
            style.itemsCenter,
            style.justifyCenter,
            {
              flexDirection: direction === "up" ? "column" : "column-reverse",
              zIndex: 11,
            },
          ]}
        >
          <View
            style={[
              trianglePosition
                ? {
                    display: "flex",
                    paddingTop: trianglePosition[0],
                    paddingLeft: trianglePosition[1],
                    flexDirection: "row",
                    width: "100%",
                  }
                : {},
            ]}
          >
            <Triangle height={20} width={20} direction={direction}></Triangle>
          </View>
          {/* {trianglePosition ? (
          <>
            <View style={[{ height: 20 }]}></View>
            <View
              style={[
                {
                  position: "absolute",
                  top: trianglePosition[0],
                  left: trianglePosition[1],
                },
              ]}
            >
              <Triangle height={20} width={20} direction={direction}></Triangle>
            </View>
          </>
        ) : (
          
        )} */}

          <View
            style={[
              style.rounded,
              style.flexCol,
              style.justifyCenter,
              style.itemsCenter,
              {
                marginTop: direction === "up" ? -1 : 0,
                marginBottom: direction === "down" ? -1 : 0,
                minWidth: 250,
                minHeight: 50,
                backgroundColor: colors.white,
                zIndex: 11,
              },
              trianglePosition &&
                trianglePosition[1] === 0 && { borderBottomStartRadius: 0 },
              trianglePosition &&
                trianglePosition[1] === "100%" && { borderBottomEndRadius: 0 },
            ]}
          >
            {children}
          </View>
        </View>
      </View>
    </>
  );
}
