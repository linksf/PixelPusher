import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFloppyDisk,
  faCloudArrowDown,
  faBook,
} from "@fortawesome/free-solid-svg-icons";
import { StateContext } from "../context/StateContext";
import { FirebaseContext } from "../context/FirebaseContext";

const HudWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  box-sizing: border-box;
  place-items: center;
`;

const Icon = styled(FontAwesomeIcon)`
  font-size: 35px;
  color: #ecf0f1;
  margin: 5px;
  //justify-self: flex-end;
`;

const FirebaseHud = () => {
  const {
    frames,
    setFrames,
    currentFrameIndex,
    setCurrentFrameIndex,
    config,
    title,
    palette,
    blob,
    setBlob,
  } = useContext(StateContext);
  const { width, height } = config;
  const { saveFrames, loadFrameObjects } = useContext(FirebaseContext);
  const getColRowFromIndex = (index) => {
    const col = index % width;
    const row = Math.floor(index / width);
    return { col, row };
  };
  const addFrame = () => {
    console.log(JSON.stringify(frames));
    const newFrames = [...frames];
    newFrames.push(new Array(config.width * config.height).fill(-1));
    setFrames(newFrames);
    setCurrentFrameIndex(newFrames.length - 1);
  };
  const turnFramesToObject = () => {
    const framesObject = {};
    for (let i = 0; i < frames.length; i++) {
      framesObject[`${i}`] = frames[i];
    }
    return framesObject;
  };
  const saveToFirebase = () => {
    makeFrameReel()
      .then(() => {
        saveFrames({
          name: title,
          frames: turnFramesToObject(),
          palette: palette,
          blob: blob,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const makeFrameReel = async () => {
    const reelCanvas = document.createElement("canvas");
    reelCanvas.width = frames.length * width * 4;
    reelCanvas.height = height * 4;
    reelCanvas.style.position = "absolute";
    reelCanvas.style.top = 0;
    reelCanvas.style.left = 0;
    reelCanvas.style.zIndex = 1;

    const reelContext = reelCanvas.getContext("2d");
    for (let i = 0; i < frames.length; i++) {
      const frame = [...frames[i]];
      for (let j = 0; j < frame.length; j++) {
        const { col, row } = getColRowFromIndex(j);
        reelContext.fillStyle = frame[j] >= 0 ? palette[frame[j]] : "#00000000";
        reelContext.fillRect(col * 4 + i * width * 4, row * 4, 4, 4);
      }
    }
    for (let i = 0; i < frames.length; i++) {
      reelContext.strokeStyle = "#000000";
      reelContext.lineWidth = 1;
      reelContext.beginPath();
      reelContext.moveTo(i * width * 4, 0);
      reelContext.lineTo(i * width * 4, height * 4);
      reelContext.stroke();
    }
    document.body.appendChild(reelCanvas);
    reelCanvas.toBlob((blob) => {
      setBlob(blob);
    });
    reelCanvas.remove();
  };
  const loadFrame = () => {
    const frameObjects = loadFrameObjects();
  };
  const addAsset = () => {
    console.log("add asset");
  };
  return (
    <HudWrapper>
      <Icon icon={faFloppyDisk} onClick={saveToFirebase} />
      <Icon icon={faCloudArrowDown} onClick={loadFrame} />
      <Icon icon={faBook} onClick={addAsset} />
    </HudWrapper>
  );
};

export default FirebaseHud;
