import { Text, View } from "react-native";
import { style } from "../../../utils/style-utils";
import LoadingText from "../../../components/common/text/LoadingText";
import ResourceRank from "../../../components/common/text/ResourceRank";
import SkeletonText from "../../../components/common/text/SkeletonText";
import { colors } from "../../../utils/color-utils";

export default function PlayerInfosSubHeader({
  name,
  level,
  pooTrophees,
  pooCoins,
}: {
  name?: string;
  level?: number;
  pooTrophees?: number;
  pooCoins?: number;
}) {
  return (
    <View style={[style.flexCol, { gap: 10 }]}>
      <View style={[style.flexRow, style.itemsCenter, { gap: 10 }]}>
        {level && (
          <View
            style={[
              style.flexCol,
              style.justifyCenter,
              style.itemsCenter,
              {
                width: 40,
                height: 40,
                backgroundColor: colors.blue[400],
                borderRadius: 5,
              },
            ]}
          >
            <Text
              style={[
                {
                  textAlign: "center",
                  fontWeight: "700",
                  color: colors.white,
                },
              ]}
            >
              {level}
            </Text>
          </View>
        )}
        <LoadingText
          text={name}
          fontSize={25}
          textStyle={{ fontWeight: "700" }}
          skeletonStyle={{ width: 150 }}
        ></LoadingText>
      </View>
      <View style={[style.flexRow, style.itemsCenter, { gap: 5 }]}>
        {pooTrophees !== undefined && pooCoins !== undefined ? (
          <>
            <ResourceRank
              resource="pooTrophee"
              value={pooTrophees}
            ></ResourceRank>
            <ResourceRank resource="pooCoins" value={pooCoins}></ResourceRank>
          </>
        ) : (
          <SkeletonText width={120} fontSize={20}></SkeletonText>
        )}
      </View>
    </View>
  );
}
