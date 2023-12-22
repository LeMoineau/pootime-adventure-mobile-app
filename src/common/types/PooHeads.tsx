import React from "react";
import PooHead from "../components/icons/head/PooHead";
import FlowerHead from "../components/icons/head/FlowerHead";

export const PooHeads: { [name: string]: (props: any) => React.ReactNode } = {
  classic: (props) => <PooHead {...props}></PooHead>,
  flower: (props) => <FlowerHead {...props}></FlowerHead>,
};
