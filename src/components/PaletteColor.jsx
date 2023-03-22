import React, { useState, useContext } from "react";
import styled from "styled-components";
import { StateContext } from "../context/StateContext";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 5px;
  padding: 5px;
`;
const ColorName = styled.p``;
const ColorBox = styled.div`
  background-color: ${(props) => props.color};
  padding: 10px;
  margin: 0;
  border: thin solid black;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  box-shadow: 1px 1px 0px 0px #000;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  scale: ${(props) => (props.active ? 1.2 : 1)};

  &:hover {
    box-shadow: 1px 1px 3px 0px #000;
  }

  &:before {
    content: ${(props) => "#" + props.index};
    font-family: "Poppins", sans-serif;
    font-weight: 800;
    padding: 0;
    margin: 0;
    mix-blend-mode: difference;
  }
`;

const PaletteColor = ({ index }) => {
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
    setCurrentColorIndex(index);
  };

  return (
    <Wrapper>
      <ColorBox
        color={palette[index]}
        onClick={handleClick}
        active={currentColorIndex === index}
        index={index}
      />
    </Wrapper>
  );
};

export default PaletteColor;
