import React, { useState, useEffect, useRef, useContext } from "react";
import { StateContext } from "../context/StateContext";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faArrowDown,
  faArrowUp,
} from "@fortawesome/free-solid-svg-icons";

const Arrow = styled(FontAwesomeIcon)`
  font-size: 20px;
  color: black;
  background-color: palegreen;
  border: thin solid #000000;
  width: ${(props) => (props.orientation === "horrizontal" ? 200 : 20)}px;
  height: ${(props) => (props.orientation === "horrizontal" ? 20 : 200)}px;
  position: absolute;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  bottom: ${(props) => props.bottom};
  right: ${(props) => props.right};
  display: ${(props) => (props.visible === "true" ? "block" : "none")};
  cursor: pointer;
  z-index: 3;
  scale: ${(props) => (props.activated === "true" ? "1.2" : "1")};
  transition: all 200ms ease-in-out;
`;

const ArrowContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PanHandle = ({ direction, icon, top, left, bottom, right }) => {
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
    config,
    setConfig,
    brushSize,
    setBrushSize,
    showPreviousFrame,
    setShowPreviousFrame,
    scaleMod,
    setScaleMod,
    undoData,
    setUndoData,
    undoAvailable,
    setUndoAvailable,
    xOffset,
    setXOffset,
    yOffset,
    setYOffset,
    testBoundsX,
    testBoundsY,
    activePanDirection,
    setActivePanDirection,
  } = useContext(StateContext);

  return (
    <Arrow
      orientation={direction}
      top={top}
      left={left}
      bottom={bottom}
      right={right}
      activated={activePanDirection === direction}
      icon={icon}
      onMouseDown={(e) => move("right")}
      onMouseUp={endPan}
      onTouchStart={(e) => move("right")}
      onTouchEnd={endPan}
    />
  );
};

export default PanHandle;
