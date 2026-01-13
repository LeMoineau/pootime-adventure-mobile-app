import GodPoulpeIcon from "../../../../common/components/icons/entities/god-poulpe/GodPoulpe";
import GodPoulpeFaintedIcon from "../../../../common/components/icons/entities/god-poulpe/GodPoulpeFainted";
import GremlinsIcon from "../../../../common/components/icons/entities/gremlins/Gremlins";
import GremlinsFaintedIcon from "../../../../common/components/icons/entities/gremlins/GremlinsFainted";
import HorrorMaskIcon from "../../../../common/components/icons/entities/horror-mask/HorrorMaskIcon";
import HorrorMaskFaintedIcon from "../../../../common/components/icons/entities/horror-mask/HorrorMaskFainted";
import PingooIcon from "../../../../common/components/icons/entities/pingoo/Pingoo";
import PingooFaintedIcon from "../../../../common/components/icons/entities/pingoo/PingooFainted";
import PoulpeIcon from "../../../../common/components/icons/entities/poulpe/Poulpe";
import PoulpeFaintedIcon from "../../../../common/components/icons/entities/poulpe/PoulpeFainted";
import { CutSheepIcon } from "../../../../common/components/icons/entities/sheep/cutSheep";
import SheepIcon from "../../../../common/components/icons/entities/sheep/sheep";
import TankIcon from "../../../../common/components/icons/entities/tank/Tank";
import TankFaintedIcon from "../../../../common/components/icons/entities/tank/TankFainted";
import { GodPoulpe } from "../../../../common/models/entities/monsters/GodPoulpe";
import { Gremlins } from "../../../../common/models/entities/monsters/Gremlins";
import { Monster } from "../../../../common/models/entities/monsters/Monster";
import { Sheep } from "../../../../common/models/entities/monsters/Sheep";
import { HorrorMask } from "../../../../common/models/entities/monsters/HorrorMask";
import { Pingoo } from "../../../../common/models/entities/monsters/Pingoo";
import { Poulpe } from "../../../../common/models/entities/monsters/Poulpe";
import { Tank } from "../../../../common/models/entities/monsters/Tank";

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
