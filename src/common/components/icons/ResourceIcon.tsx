import { Resources } from "../../types/Resources";
import PooCoinIcon from "./pooCoin";
import WoolIcon from "./sheep/wool";
import StarIcon from "./star";

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
