import GodPoulpeIcon from "../../../common/components/icons/entities/god-poulpe/GodPoulpe";
import GodPoulpeFaintedIcon from "../../../common/components/icons/entities/god-poulpe/GodPoulpeFainted";
import GremlinsIcon from "../../../common/components/icons/entities/gremlins/Gremlins";
import GremlinsFaintedIcon from "../../../common/components/icons/entities/gremlins/GremlinsFainted";
import HorrorMask from "../../../common/components/icons/entities/horror-mask/HorrorMask";
import HorrorMaskFaintedIcon from "../../../common/components/icons/entities/horror-mask/HorrorMaskFainted";
import PingooIcon from "../../../common/components/icons/entities/pingoo/Pingoo";
import PingooFaintedIcon from "../../../common/components/icons/entities/pingoo/PingooFainted";
import PoulpeIcon from "../../../common/components/icons/entities/poulpe/Poulpe";
import PoulpeFaintedIcon from "../../../common/components/icons/entities/poulpe/PoulpeFainted";
import { CutSheepIcon } from "../../../common/components/icons/entities/sheep/cutSheep";
import SheepIcon from "../../../common/components/icons/entities/sheep/sheep";
import TankIcon from "../../../common/components/icons/entities/tank/Tank";
import TankFaintedIcon from "../../../common/components/icons/entities/tank/TankFainted";
import { Entity } from "../../../common/types/battle/entity-battle/EntityBattleTypes";

export default function EntityView({
  entity,
  fainted,
}: {
  entity: Entity;
  fainted: boolean;
}) {
  return (
    <>
      {entity.entityType === "sheep" &&
        (fainted ? (
          <CutSheepIcon woolColor={entity.color} ratio={0.5}></CutSheepIcon>
        ) : (
          <SheepIcon woolColor={entity.color} ratio={0.5}></SheepIcon>
        ))}
      {entity.entityType === "god-poulpe" &&
        (fainted ? (
          <GodPoulpeFaintedIcon ratio={0.3}></GodPoulpeFaintedIcon>
        ) : (
          <GodPoulpeIcon ratio={0.3}></GodPoulpeIcon>
        ))}
      {entity.entityType === "gremlins" &&
        (fainted ? (
          <GremlinsFaintedIcon
            ratio={0.5}
            translateX={-30}
          ></GremlinsFaintedIcon>
        ) : (
          <GremlinsIcon ratio={0.5} translateX={-30}></GremlinsIcon>
        ))}
      {entity.entityType === "horror-mask" &&
        (fainted ? (
          <HorrorMaskFaintedIcon
            ratio={0.22}
            translateY={-30}
          ></HorrorMaskFaintedIcon>
        ) : (
          <HorrorMask ratio={0.22} translateY={-30}></HorrorMask>
        ))}
      {entity.entityType === "pingoo" &&
        (fainted ? (
          <PingooFaintedIcon ratio={0.45}></PingooFaintedIcon>
        ) : (
          <PingooIcon ratio={0.45}></PingooIcon>
        ))}
      {entity.entityType === "poulpe" &&
        (fainted ? (
          <PoulpeFaintedIcon ratio={0.2}></PoulpeFaintedIcon>
        ) : (
          <PoulpeIcon ratio={0.2}></PoulpeIcon>
        ))}
      {entity.entityType === "tank" &&
        (fainted ? (
          <TankFaintedIcon ratio={0.5} translateY={-30}></TankFaintedIcon>
        ) : (
          <TankIcon ratio={0.5} translateY={-30}></TankIcon>
        ))}
    </>
  );
}
