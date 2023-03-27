import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaintBrush,
  faEraser,
  faFill,
  faEyeDropper,
  faUndo,
} from "@fortawesome/free-solid-svg-icons";
import ToolPicker from "./ToolPicker";
import { StateContext } from "../context/StateContext";
import BrushSizeChanger from "./BrushSizeChanger";

const Icon = styled(FontAwesomeIcon)`
  color: ${(props) => (props.available ? "#232323" : "#686868")};
  font-size: 25px;
  cursor: pointer;
`;
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
  const {
    toolActive,
    undoData,
    frames,
    currentFrameIndex,
    setFrames,
    undoAvailable,
    setUndoAvailable,
  } = useContext(StateContext);

  const tools = [
    { name: "draw", icon: faPaintBrush },
    { name: "erase", icon: faEraser },
    { name: "fill", icon: faFill },
    { name: "eyeDropper", icon: faEyeDropper },
  ];
  const toolPickers = tools.map((tool) => (
    <ToolPicker key={tool.name} name={tool.name} icon={tool.icon} />
  ));

  const undo = () => {
    const newFrame = [...undoData[currentFrameIndex]];
    const tempFrames = [...frames];
    tempFrames[currentFrameIndex] = newFrame;
    setFrames(tempFrames);
    const tempUndoAvailable = [...undoAvailable];
    tempUndoAvailable[currentFrameIndex] = false;
    setUndoAvailable(tempUndoAvailable);
  };

  return (
    <HudWrapper bgColor="#ffffff" active={toolActive}>
      <Icon
        icon={faUndo}
        onClick={undo}
        available={undoAvailable[currentFrameIndex]}
      />
      {toolPickers}
      <BrushSizeChanger />
    </HudWrapper>
  );
};

export default ToolHud;
