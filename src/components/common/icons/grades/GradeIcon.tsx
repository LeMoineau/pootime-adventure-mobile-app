import gradeService, {
  GradeColor,
  GradeTier,
} from "../../../../services/grade.service";
import { CustomSvgProps } from "../../../../types/CustomSvgProps";
import GradeTier1Icon from "./GradeTier1Icon";
import GradeTier2Icon from "./GradeTier2Icon";
import GradeTier3Icon from "./GradeTier3Icon";
import GradeTier4Icon from "./GradeTier4Icon";
import LoadingGradeIcon from "./LoadingGradeIcon";

export default function GradeIcon({
  pooTrophees,
  ...props
}: {
  tier?: GradeTier;
  color?: GradeColor;
  pooTrophees?: number;
} & CustomSvgProps) {
  let tier = props.tier;
  let color = props.color;

  if (!tier || !color) {
    if (pooTrophees === undefined) {
      return <LoadingGradeIcon {...props}></LoadingGradeIcon>;
    }
    tier = gradeService.getTier(pooTrophees);
    color = gradeService.getColor(pooTrophees);
  }

  if (tier === 1) {
    return <GradeTier1Icon color={color} {...props}></GradeTier1Icon>;
  }
  if (tier === 2) {
    return <GradeTier2Icon color={color} {...props}></GradeTier2Icon>;
  }
  if (tier === 3) {
    return <GradeTier3Icon color={color} {...props}></GradeTier3Icon>;
  }
  if (tier === 4) {
    return <GradeTier4Icon color={color} {...props}></GradeTier4Icon>;
  }
  return <LoadingGradeIcon {...props}></LoadingGradeIcon>;
}
