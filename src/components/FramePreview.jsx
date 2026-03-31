import { useState, useContext } from "react";
import styled from "styled-components";
import { StateContext } from "../context/StateContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { FirebaseContext } from "../context/FirebaseContext";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  border: thin solid black;
  margin: 15px 0;
`;
const Image = styled.img`
  height: 96px;
  width: 96px;
  margin: 6px;
  z-index: ${(props) => 10 - props.index};
  box-shadow: 1px 1px 2px 1px #000000;
  transition: all 0.4s ease-in-out;
  &:hover {
    box-shadow: 2px 2px 3px 3px #00000099;
  }
`;
const Title = styled.label`
  font-size: 1rem;
  font-weight: 500;
  position: relative;
  top: -15px;
  padding: 0 10px;
  background-color: white;
`;
const ImageViewer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 300px;
  height: 108px;
  margin: 6px;
  box-shadow: inset 1px 1px 2px 1px #000000;
  overflow-x: scroll;
  background-color: #ffffff;
  background-size: 15px 15px;
  background-color: white;

  background-image: linear-gradient(
      to right,
      rgba(0, 0, 0, 0.2) 50%,
      transparent 50%,
      transparent
    ),
    linear-gradient(
      to right,
      transparent 0%,
      transparent 50%,
      rgba(0, 0, 0, 0) 50%
    ),
    linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.2) 50%,
      transparent 50%,
      transparent
    ),
    linear-gradient(
      to bottom,
      transparent 0%,
      transparent 50%,
      rgba(0, 0, 0, 0) 50%
    ),
    linear-gradient(to bottom, #ffffff 50%, transparent 50%, transparent),
    linear-gradient(
      to right,
      transparent 0%,
      transparent 50%,
      rgba(0, 0, 0, 0.4) 50%
    ),
    none;
`;
const FramePreview = ({ frameObject }) => {
  // const { name, urls } = frameObject;
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
    importFrames,
  } = useContext(StateContext);
  return (
    <Wrapper
      onClick={(e) => {
        importFrames(frameObject);
      }}
    >
      <Title>{frameObject.name}</Title>
      <ImageViewer>
        {frameObject.urls.map((url) => (
          <Image src={url} alt="preview" />
        ))}
      </ImageViewer>
    </Wrapper>
  );
};

export default FramePreview;
