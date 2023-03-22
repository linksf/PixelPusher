import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaintBrush,
  faEraser,
  faFill,
  faEyeDropper,
} from "@fortawesome/free-solid-svg-icons";
import ToolPicker from "./ToolPicker";
import { StateContext } from "../context/StateContext";
import BrushSizeChanger from "./BrushSizeChanger";
const HudWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;

  box-sizing: border-box;
`;

const ToolHud = ({}) => {
  const { toolActive } = useContext(StateContext);

  const tools = [
    { name: "draw", icon: faPaintBrush },
    { name: "erase", icon: faEraser },
    { name: "fill", icon: faFill },
    { name: "eyeDropper", icon: faEyeDropper },
  ];
  const toolPickers = tools.map((tool) => (
    <ToolPicker key={tool.name} name={tool.name} icon={tool.icon} />
  ));
  return (
    <HudWrapper bgColor="#ffffff" active={toolActive}>
      {toolPickers}
      <BrushSizeChanger />
    </HudWrapper>
  );
};

export default ToolHud;
