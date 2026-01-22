import React from "react";
import PooHead from "../components/common/icons/poo-creature/head/PooHead";
import FlowerHead from "../components/common/icons/poo-creature/head/FlowerHead";
import SheepHead from "../components/common/icons/poo-creature/head/SheepHead";
import SheepWithEarHead from "../components/common/icons/poo-creature/head/SheepWithEarHead";
import SheepQueenHead from "../components/common/icons/poo-creature/head/SheepQueenHead";
import PingooHead from "../components/common/icons/poo-creature/head/PingooHead";
import { PooHeadName } from "./shop/BuyableItem";
import PoulpeHead from "../components/common/icons/poo-creature/head/PoulpeHead";
import AureoledPooHead from "../components/common/icons/poo-creature/head/AureoledPooHead";

export const PooHeads: {
  [name in PooHeadName]: (props: any) => React.ReactNode;
} = {
  classic: (props) => <PooHead {...props}></PooHead>,
  flower: (props) => <FlowerHead {...props}></FlowerHead>,
  sheepWithEar: (props) => <SheepWithEarHead {...props}></SheepWithEarHead>,
  sheep: (props) => <SheepHead {...props}></SheepHead>,
  sheepQueen: (props) => <SheepQueenHead {...props}></SheepQueenHead>,
  pingoo: (props) => <PingooHead {...props}></PingooHead>,
  poulpe: (props) => <PoulpeHead {...props}></PoulpeHead>,
  aureoledClassic: (props) => <AureoledPooHead {...props}></AureoledPooHead>,
};
