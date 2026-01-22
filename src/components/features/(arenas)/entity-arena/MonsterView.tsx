import GodPoulpeIcon from "../../../common/icons/entities/god-poulpe/GodPoulpe";
import GodPoulpeFaintedIcon from "../../../common/icons/entities/god-poulpe/GodPoulpeFainted";
import GremlinsIcon from "../../../common/icons/entities/gremlins/Gremlins";
import GremlinsFaintedIcon from "../../../common/icons/entities/gremlins/GremlinsFainted";
import HorrorMaskIcon from "../../../common/icons/entities/horror-mask/HorrorMaskIcon";
import HorrorMaskFaintedIcon from "../../../common/icons/entities/horror-mask/HorrorMaskFainted";
import PingooIcon from "../../../common/icons/entities/pingoo/Pingoo";
import PingooFaintedIcon from "../../../common/icons/entities/pingoo/PingooFainted";
import PoulpeIcon from "../../../common/icons/entities/poulpe/Poulpe";
import PoulpeFaintedIcon from "../../../common/icons/entities/poulpe/PoulpeFainted";
import { CutSheepIcon } from "../../../common/icons/entities/sheep/cutSheep";
import SheepIcon from "../../../common/icons/entities/sheep/sheep";
import TankIcon from "../../../common/icons/entities/tank/Tank";
import TankFaintedIcon from "../../../common/icons/entities/tank/TankFainted";
import { GodPoulpe } from "../../../../models/entities/monsters/GodPoulpe";
import { Gremlins } from "../../../../models/entities/monsters/Gremlins";
import { Monster } from "../../../../models/entities/monsters/Monster";
import { Sheep } from "../../../../models/entities/monsters/Sheep";
import { HorrorMask } from "../../../../models/entities/monsters/HorrorMask";
import { Pingoo } from "../../../../models/entities/monsters/Pingoo";
import { Poulpe } from "../../../../models/entities/monsters/Poulpe";
import { Tank } from "../../../../models/entities/monsters/Tank";

export default function MonsterView({
  monster,
  fainted,
}: {
  monster: Monster;
  fainted: boolean;
}) {
  if (monster instanceof Sheep) {
    return fainted ? (
      <CutSheepIcon woolColor={monster.color} ratio={0.5}></CutSheepIcon>
    ) : (
      <SheepIcon woolColor={monster.color} ratio={0.5}></SheepIcon>
    );
  }
  if (monster instanceof GodPoulpe) {
    return fainted ? (
      <GodPoulpeFaintedIcon ratio={0.3}></GodPoulpeFaintedIcon>
    ) : (
      <GodPoulpeIcon ratio={0.3}></GodPoulpeIcon>
    );
  }
  if (monster instanceof Gremlins) {
    return fainted ? (
      <GremlinsFaintedIcon ratio={0.5} translateX={-30}></GremlinsFaintedIcon>
    ) : (
      <GremlinsIcon ratio={0.5} translateX={-30}></GremlinsIcon>
    );
  }
  if (monster instanceof HorrorMask) {
    return fainted ? (
      <HorrorMaskFaintedIcon
        ratio={0.22}
        translateY={-30}
      ></HorrorMaskFaintedIcon>
    ) : (
      <HorrorMaskIcon ratio={0.22} translateY={-30}></HorrorMaskIcon>
    );
  }
  if (monster instanceof Pingoo) {
    monster instanceof Pingoo &&
      (fainted ? (
        <PingooFaintedIcon ratio={0.45}></PingooFaintedIcon>
      ) : (
        <PingooIcon ratio={0.45}></PingooIcon>
      ));
  }
  if (monster instanceof Poulpe) {
    return fainted ? (
      <PoulpeFaintedIcon ratio={0.2}></PoulpeFaintedIcon>
    ) : (
      <PoulpeIcon ratio={0.2}></PoulpeIcon>
    );
  }
  if (monster instanceof Tank) {
    return fainted || monster.sad ? (
      <TankFaintedIcon ratio={0.5} translateY={-30}></TankFaintedIcon>
    ) : (
      <TankIcon ratio={0.5} translateY={-30}></TankIcon>
    );
  }
  return <></>;
}
