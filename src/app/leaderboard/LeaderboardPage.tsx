import { Pressable, ScrollView, Text, View } from "react-native";
import CustomPage from "../../common/components/navigation/CustomPage";
import { colors } from "../../common/utils/color-utils";
import { style } from "../../common/utils/style-utils";
import { useNavigationType } from "../../common/types/navigation/NavigationTypes";
import { useNavigation } from "@react-navigation/native";
import LeaderboardRow from "./elements/LeaderboardRow";
import RoundedScrollView from "../../common/components/views/rounded-scroll-view/RoundedScrollView";
import PooCreatureBadge from "../../common/components/misc/poo-creature/PooCreatureBadge";
import StandardButton from "../../common/components/buttons/StandardButton";
import PooTropheeIcon from "../../common/components/icons/resources/PooTropheeIcon";
import PooCoinIcon from "../../common/components/icons/resources/pooCoin";
import TropheeBoard from "./elements/boards/TropheeBoard";
import { getAuth } from "firebase/auth";

export default function LeaderboardPage() {
  const navigator: useNavigationType = useNavigation();

  return (
    <>
      <CustomPage
        bgColor={colors.baseBackgroundColor}
        style={[
          style.flexCol,
          style.justifyCenter,
          style.itemsCenter,
          { padding: 0 },
        ]}
      >
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
                  const currentUser = getAuth().currentUser;
                  const token = await currentUser?.getIdToken();
                  console.log(token);
                }}
              >
                Coucou
              </StandardButton>
            </View>
          </View>
        </View>
        <RoundedScrollView
          defaultTab={0}
          tabs={[
            {
              icon: <PooTropheeIcon height={35}></PooTropheeIcon>,
              content: <TropheeBoard></TropheeBoard>,
            },
            {
              icon: <PooCoinIcon size={35}></PooCoinIcon>,
              content: <LeaderboardRow></LeaderboardRow>,
            },
          ]}
        ></RoundedScrollView>
        {/* <ScrollView
          style={[
            style.border,
            {
              backgroundColor: colors.white,
              marginTop: 60,
              marginHorizontal: 10,
              flex: 1,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              paddingHorizontal: 10,
              paddingTop: 10,
            },
          ]}
        >
          <View
            style={[
              style.flexRow,
              style.itemsCenter,
              {
                paddingTop: 20,
                paddingBottom: 10,
              },
            ]}
          >
            <Pressable
              onPress={() => navigator.goBack()}
              style={{ paddingRight: 10 }}
            >
              <ExpoIcon name="chevron-back" size={20}></ExpoIcon>
            </Pressable>
            <Text
              style={[
                {
                  fontSize: 17,
                  letterSpacing: 1,
                  fontWeight: "500",
                },
              ]}
            >
              Leaderboard
            </Text>
          </View>
          <View
            style={[
              style.flexRow,
              style.rounded,
              style.itemsCenter,
              {
                flex: 1,
                flexWrap: "wrap",
                marginTop: 10,
                paddingBottom: 10,
                paddingTop: 5,
              },
            ]}
          >
            <LeaderboardRow></LeaderboardRow>
            {/* {Object.keys(inventory).map((resource, index) => {
              if (get(resource as Resources) <= 0) return;
              return (
                <View
                  key={`inventory-item-${resource}-${index}`}
                  style={[
                    style.flexRow,
                    style.justifyCenter,
                    style.itemsCenter,
                    { padding: 10, width: 60, height: 60 },
                  ]}
                >
                  <ResourceIcon
                    resource={resource as Resources}
                    size={40}
                  ></ResourceIcon>
                  <Text
                    style={[
                      style.textShadowMd,
                      {
                        position: "absolute",
                        bottom: 0,
                        right: 0,
                        fontWeight: "700",
                        color: colors.white,
                      },
                    ]}
                  >
                    {get(resource as Resources) >= 1000000
                      ? MathUtils.convertToReduceStrFormat(
                          get(resource as Resources)
                        )
                      : get(resource as Resources)}
                  </Text>
                </View>
              );
            })} 
          </View>
        </ScrollView> */}
      </CustomPage>
    </>
  );
}
