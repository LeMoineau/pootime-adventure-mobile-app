import React from "react";
import PooHead from "../components/icons/head/PooHead";
import FlowerHead from "../components/icons/head/FlowerHead";
import SheepHead from "../components/icons/head/SheepHead";
import SheepWithEarHead from "../components/icons/head/SheepWithEarHead";
import SheepQueenHead from "../components/icons/head/SheepQueenHead";

export const PooHeads: { [name: string]: (props: any) => React.ReactNode } = {
  classic: (props) => <PooHead {...props}></PooHead>,
  flower: (props) => <FlowerHead {...props}></FlowerHead>,
  sheepWithEar: (props) => <SheepWithEarHead {...props}></SheepWithEarHead>,
  sheep: (props) => <SheepHead {...props}></SheepHead>,
  sheepQueen: (props) => <SheepQueenHead {...props}></SheepQueenHead>,
};
