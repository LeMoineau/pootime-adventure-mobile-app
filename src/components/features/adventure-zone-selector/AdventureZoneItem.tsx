import { Image } from "expo-image";
import { Pressable, Text, View } from "react-native";
import TextWithSubShadow from "../../common/text/TextWithSubShadow";
import { style } from "../../../constants/style/styles";
import { colors } from "../../../constants/style/colors";
import PooCreatureBadge from "../../common/misc/poo-creature/PooCreatureBadge";
import StandardButton from "../../common/buttons/StandardButton";

export default function AdventureZoneItem({
  zone,
  zoneSelected,
  zoneUnlocked,
  nextZoneUnlocked,
  lastZone,
  onIconPress,
  onGoingBtnPress,
}: {
  zone: any;
  zoneUnlocked: boolean;
  nextZoneUnlocked: boolean;
  zoneSelected: boolean;
  lastZone?: boolean;
  onIconPress?: () => void;
  onGoingBtnPress?: () => void;
}) {
  return (
    <View
      style={{
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        pointerEvents: zoneUnlocked ? "auto" : "none",
      }}
    >
      <View
        style={{
          width: "100%",
          paddingLeft: 60,
          paddingRight: 15,
          paddingTop: 40,
        }}
      >
        <Pressable
          onPress={() => {
            onIconPress && onIconPress();
          }}
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <Image
            source={zone.icon}
            contentFit="contain"
            tintColor={zoneUnlocked ? undefined : "rgba(0, 0, 0, 0.8)"}
            contentPosition={"bottom left"}
            style={[
              {
                width: "100%",
                height: zone.style.iconHeight,
              },
            ]}
          ></Image>
          {!zoneUnlocked && (
            <TextWithSubShadow
              style={{
                position: "absolute",
                textAlign: "center",
                width: "100%",
                bottom: 30,
                fontSize: 15,
              }}
            >
              Déblocable au niveau {zone.unlockLevel}
            </TextWithSubShadow>
          )}
        </Pressable>
        <View
          style={[
            style.border,
            {
              position: "relative",
              marginLeft: -50,
              marginTop: -40,
              width: 40,
              height: 40,
              backgroundColor: zoneUnlocked ? colors.white : colors.gray[300],
              borderRadius: 100,
              borderWidth: 2,
              borderColor: zoneUnlocked ? colors.green[400] : colors.gray[400],
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            },
          ]}
        >
          {zoneSelected && <PooCreatureBadge size={30}></PooCreatureBadge>}
          {!zoneUnlocked && (
            <Text style={{ fontSize: 10, fontWeight: "900" }}>
              {zone.unlockLevel}
            </Text>
          )}
        </View>
        {zoneSelected && (
          <View
            style={[
              style.border,
              {
                width: "100%",
                backgroundColor: colors.white,
                paddingHorizontal: 20,
                paddingVertical: 20,
                borderRadius: 10,
                marginTop: 10,
              },
            ]}
          >
            <TextWithSubShadow style={{ color: zone.style.mainColor }}>
              {zone.name}
            </TextWithSubShadow>
            <Text style={{ fontSize: 13, marginTop: 5 }}>{zone.desc}</Text>
            <StandardButton
              style={[
                {
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "flex-end",
                  marginTop: 10,
                },
              ]}
              viewStyle={[
                style.border,
                {
                  borderColor: colors.primary,
                  paddingVertical: 10,
                  paddingHorizontal: 10,
                },
              ]}
              bgColor={colors.primary}
              textStyle={{
                fontSize: 16,
                fontWeight: "600",
                color: colors.white,
                textTransform: "uppercase",
              }}
              onPress={() => {
                onGoingBtnPress && onGoingBtnPress();
              }}
            >
              Y Aller !
            </StandardButton>
          </View>
        )}
      </View>
      <View
        style={{
          backgroundColor: zoneUnlocked ? colors.green[400] : colors.gray[300],
          width: 20,
          height: zone.style.iconHeight + 40,
          position: "absolute",
          top: -0,
          left: 20,
          zIndex: -1,
        }}
      ></View>
      {zoneSelected && !lastZone && (
        <View
          style={{
            backgroundColor: nextZoneUnlocked
              ? colors.green[400]
              : colors.gray[300],
            width: 20,
            height: "100%",
            position: "absolute",
            top: 0,
            left: 20,
            zIndex: -2,
          }}
        ></View>
      )}
    </View>
  );
}
