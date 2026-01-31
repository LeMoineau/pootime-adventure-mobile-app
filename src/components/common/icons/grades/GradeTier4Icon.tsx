import { CustomSvgProps } from "../../../../types/CustomSvgProps";
import GradeTier4BronzeIcon from "./GradeTier4BronzeIcon";
import GradeTier4GoldIcon from "./GradeTier4GoldIcon";
import GradeTier4SilverIcon from "./GradeTier4SilverIcon";

export default function GradeTier4Icon({
  color,
  ...props
}: {
  color: "bronze" | "silver" | "gold";
} & CustomSvgProps) {
  if (color === "bronze") {
    return <GradeTier4BronzeIcon {...props}></GradeTier4BronzeIcon>;
  }
  if (color === "silver") {
    return <GradeTier4SilverIcon {...props}></GradeTier4SilverIcon>;
  }
  if (color === "gold") {
    return <GradeTier4GoldIcon {...props}></GradeTier4GoldIcon>;
  }
  return <></>;
}
