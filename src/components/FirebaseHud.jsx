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
import AssetLibrary from "./AssetLibrary";

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
  const { putFrames, loadFramesArray } = useContext(FirebaseContext);
  const [framesData, setFramesData] = useState([]);
  const [showLibrary, setShowLibrary] = useState(false);
  const toggleLibrary = () => {
    const newShowLibrary = !showLibrary;
    setShowLibrary(newShowLibrary);
  };
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

  const loadFrames = async () => {
    loadFramesArray()
      .then((dataArray) => {
        console.log(dataArray);
        setFramesData(dataArray);
        toggleLibrary();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const addAsset = () => {
    console.log("add asset");
  };
  return (
    <HudWrapper>
      {showLibrary && framesData.length > 0 ? (
        <AssetLibrary framesdata={framesData} closer={toggleLibrary} />
      ) : null}
      <Icon
        icon={faFloppyDisk}
        onClick={(e) => {
          putFrames({
            frames: turnFramesToObject(),
            name: title,
            palette: palette,
            config: config,
          });
        }}
      />
      <Icon icon={faCloudArrowDown} onClick={loadFrames} />
      <Icon icon={faBook} onClick={toggleLibrary} />
    </HudWrapper>
  );
};

export default FirebaseHud;
