import { Text, View } from "react-native";
import { style } from "../../../constants/style/styles";
import LoadingText from "../../common/text/LoadingText";
import ResourceRank from "../../common/text/ResourceRank";
import SkeletonText from "../../common/text/SkeletonText";
import { colors } from "../../../constants/style/colors";
import GradeIcon from "../../common/icons/grades/GradeIcon";

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
      <View
        style={[
          style.flexRow,
          style.itemsCenter,
          { flexWrap: "wrap", gap: 10 },
        ]}
      >
        <GradeIcon pooTrophees={pooTrophees} height={45}></GradeIcon>
        <LoadingText
          text={name}
          fontSize={25}
          textStyle={{ fontWeight: "700" }}
          skeletonStyle={{ width: 150 }}
        ></LoadingText>
        {level && (
          <Text
            style={[
              {
                textAlign: "center",
                fontWeight: "700",
                color: colors.white,
                backgroundColor: colors.primary,
                paddingHorizontal: 12,
                paddingVertical: 5,
                borderRadius: 20,
              },
            ]}
          >
            niv. {level}
          </Text>
        )}
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
