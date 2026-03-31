import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faCopy } from "@fortawesome/free-solid-svg-icons";
import { StateContext } from "../context/StateContext";

const HudWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  align-items: center;
  justify-content: center;
  width: 100%;
  box-sizing: border-box;
  place-items: center;
`;

const Frame = styled.div`
  width: 50px;
  height: 50px;
  margin: 5px;
  padding: 0;
  border-radius: 10px;
  display: grid;
  place-items: center;
  border: 1px solid black;
  background-color: ${(props) => (props.isActive ? "#ecf0f1" : "#a3a6a7")};
`;

const FrameNumber = styled.p`
  font-size: 25px;
  color: #232323;
  text-align: center;
  font-weight: bold;
  margin: 0;
  padding: 0;
`;

const Icon = styled(FontAwesomeIcon)`
  font-size: 45px;
  color: #ecf0f1;
  grid-column: -1;
  margin: 5px;
  grid-row: 1;
  //justify-self: flex-end;
`;

const FrameHud = () => {
  const {
    frames,
    setFrames,
    currentFrameIndex,
    setCurrentFrameIndex,
    config,
  } = useContext(StateContext);

  const changeFrame = (index) => {
    setCurrentFrameIndex(index);
  };

  const addFrame = () => {
    console.log(JSON.stringify(frames));
    const newFrames = [...frames];
    newFrames.push(new Array(config.width * config.height).fill(-1));
    setFrames(newFrames);
    setCurrentFrameIndex(newFrames.length - 1);
  };

  return (
    <HudWrapper>
      {frames.map((frame, index) => (
        <Frame
          key={index}
          isActive={currentFrameIndex === index}
          onClick={() => changeFrame(index)}
        >
          <FrameNumber>{index + 1}</FrameNumber>
        </Frame>
      ))}
      <Icon icon={faPlusCircle} onClick={addFrame} />
    </HudWrapper>
  );
};

export default FrameHud;
