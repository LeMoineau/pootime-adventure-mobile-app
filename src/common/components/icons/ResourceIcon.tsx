import { Resources } from "../../config/game-data/Resources";
import PooCoinIcon from "./resources/pooCoin";
import WoolIcon from "./resources/wool";
import StarIcon from "./resources/star";

export default function ResourceIcon({
  resource,
  size,
}: {
  resource: Resources;
  size?: number;
}) {
  return (
    <>
      {resource === "pooCoins" ? (
        <PooCoinIcon size={size}></PooCoinIcon>
      ) : resource === "wool" ? (
        <WoolIcon size={size}></WoolIcon>
      ) : (
        <StarIcon size={size}></StarIcon>
      )}
    </>
  );
}
