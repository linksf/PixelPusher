import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { StateContext } from "../context/StateContext";
const ToolIcon = styled(FontAwesomeIcon)`
  font-size: 25px;
  transition: all 200ms ease;
  cursor: pointer;
  color: ${(props) =>
    props.isactive ? props.palette[props.index] : "#6c8b93"};
  position: relative;
  cursor: pointer;
  &:hover {
    transform: rotate(-45deg);
  }
`;
const Wrapper = styled.div`
  display: grid;
  place-items: center;
  position: relative;
  transition: all 200ms ease;
  cursor: pointer;
  padding: 10px;
  margin: 0 5px;
`;
const SizeLabel = styled.p`
  position: absolute;
  font-size: 10px;
  font-weight: 800;
  font-family: "Roboto", sans-serif;
  z-index: 2;
  bottom: 0;
  right: 0;
  background-color: #454545;
  color: #ecf0f1;
  border-radius: 50%;
  width: 15px;
  height: 15px;
  text-align: center;
  line-height: 15px;
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
    brushSize,
  } = useContext(StateContext);

  const handleClick = (e) => {
    setTool(name);
  };

  return (
    <Wrapper>
      <ToolIcon
        icon={icon}
        palette={palette}
        index={currentColorIndex}
        isactive={tool === name ? 1 : 0}
        onClick={handleClick}
      />
      {name === "draw" || name === "erase" ? (
        <SizeLabel>{brushSize}</SizeLabel>
      ) : null}
    </Wrapper>
  );
};
export default ToolPicker;
