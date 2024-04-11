import { Resources } from "../../config/game-data/Resources";
import PooCoinIcon from "./resources/pooCoin";
import WoolIcon from "./resources/wool";
import StarIcon from "./resources/star";
import MetalIcon from "./resources/Metal";
import InkIcon from "./resources/Ink";
import GlassIcon from "./resources/Glass";
import SnowIcon from "./resources/Snow";
import CosmicPowderIcon from "./resources/CosmicPowder";

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
      ) : resource === "stars" ? (
        <StarIcon size={size}></StarIcon>
      ) : resource === "wool" ? (
        <WoolIcon size={size}></WoolIcon>
      ) : resource === "metal" ? (
        <MetalIcon width={size}></MetalIcon>
      ) : resource === "ink" ? (
        <InkIcon height={size}></InkIcon>
      ) : resource === "glass" ? (
        <GlassIcon height={size}></GlassIcon>
      ) : resource === "snow" ? (
        <SnowIcon width={size}></SnowIcon>
      ) : (
        <CosmicPowderIcon width={size}></CosmicPowderIcon>
      )}
    </>
  );
}
