import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { StateContext } from "../context/StateContext";
const ToolIcon = styled(FontAwesomeIcon)`
  font-size: 25px;
  filter: drop-shadow(0 0 2px #000);
  transition: all 200ms ease;
  cursor: pointer;
  color: ${(props) =>
    props.isactive ? props.palette[props.index] : "#ecf0f1"};
  padding: 10px;
  &:hover {
    transform: rotate(20deg);
  }
`;

const ToolPicker = ({ name, icon }) => {
  const {
    toolActive,
    setToolActive,
    tool,
    setTool,
    currentColorIndex,
    setCurrentColorIndex,
    palette,
    setPalette,
    frames,
    setFrames,
    currentFrameIndex,
    setCurrentFrameIndex,
  } = useContext(StateContext);

  const handleClick = (e) => {
    setTool(name);
  };

  return (
    <ToolIcon
      icon={icon}
      palette={palette}
      index={currentColorIndex}
      isactive={tool === name ? 1 : 0}
      onClick={handleClick}
    />
  );
};
export default ToolPicker;
