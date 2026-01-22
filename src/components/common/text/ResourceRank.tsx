import { Text, View } from "react-native";
import { style } from "../../../utils/style-utils";
import { colors } from "../../../utils/color-utils";
import { Resources } from "../../../config/constants/Resources";
import { useResourcesStore } from "../../../stores/resources.store";
import { useUserDataTable } from "../../../hooks/firestore/use-user-data-table";
import { useEffect, useState } from "react";
import { useAuthentication } from "../../../hooks/firebase/use-authentification";
import ResourceIcon from "../icons/ResourceIcon";

/**
 *
 * @param resource Resource to get the rank
 * @param value Optional value from whom get the rank (if not set, will get current player value)
 * @returns
 */
export default function ResourceRank({
  resource,
  value,
}: {
  resource: Resources;
  value?: number;
}) {
  const { user } = useAuthentication();
  const { get } = useResourcesStore();
  const { loading, count } = useUserDataTable();
  const [rank, setRank] = useState<number>(1);

  useEffect(() => {
    if (user) {
      count({
        wheres: [
          {
            fieldPath: `resources.${resource}`,
            operator: ">",
            value: value ?? get(resource),
          },
        ],
      }).then((res) => {
        setRank(res + 1);
      });
    }
  }, [user]);

  return (
    <>
      <View style={[style.flexRow, style.itemsCenter, { gap: 5 }]}>
        <ResourceIcon resource={resource} size={22}></ResourceIcon>
        {loading ? (
          <View
            style={[
              {
                width: 30,
                height: 15,
                borderRadius: 5,
                backgroundColor: colors.gray[300],
              },
            ]}
          ></View>
        ) : (
          <>
            <Text
              style={[
                style.textBold,
                {
                  fontSize: 15,
                  color: colors.white,
                  textShadowColor: colors.black,
                  textShadowRadius: 3,
                  textShadowOffset: { width: 0, height: 0 },
                },
              ]}
            >
              {rank}
            </Text>
            <Text
              style={[
                style.textBold,
                {
                  position: "relative",
                  left: -5,
                  top: -5,
                  fontSize: 13,
                  color: colors.white,
                  textShadowColor: colors.black,
                  textShadowRadius: 3,
                  textShadowOffset: { width: 0, height: 0 },
                },
              ]}
            >
              {rank === 1 ? "er" : "e"}
            </Text>
          </>
        )}
      </View>
    </>
  );
}
