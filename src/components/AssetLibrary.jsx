import { useState, useContext } from "react";
import styled from "styled-components";
import { StateContext } from "../context/StateContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons";

const Wrapper = styled.div``;

const AssetLibrary = () => {
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
  return (
    <Wrapper>
      <FontAwesomeIcon icon={faBook} />
    </Wrapper>
  );
};

export default AssetLibrary;
