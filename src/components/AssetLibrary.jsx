import { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { StateContext } from "../context/StateContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FirebaseContext } from "../context/FirebaseContext";
import FramePreview from "./FramePreview";
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 90vw;
  height: 90vh;
  max-width: 400px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
  z-index: 100;
  overflow-y: scroll;
`;
const CloseButton = styled(FontAwesomeIcon)`
  font-size: 20px;
  color: palevioletred;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

const AssetLibrary = ({ closer, framesdata }) => {
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

  // const { loadFrameObjects } = useContext(FirebaseContext);
  // const [frameObjects, setFrameObjects] = useState([]);

  // const frameObjectsArrayToFramePreviewElements = async (framesdata) => {
  //   const framePreviewElementsArray = [];
  //   let key = 0;
  //   const elementsArray = framesdata.map((frameObject) => (
  //     <FramePreview key={key++} props={frameObject} />
  //   ));
  //   setFrameObjects(elementsArray);
  // };
  // useEffect(() => {
  //   console.log("loadFrameObjects");
  //   loadFrameObjects()
  //     .then((frameObjs) => frameObjectsArrayToFramePreviewElements(frameObjs))
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);
  return (
    <Wrapper>
      <CloseButton icon={faTimesCircle} onClick={closer} />
      {framesdata
        ? framesdata.map((frameObject) => (
            <FramePreview key={frameObject.name} frameObject={frameObject} />
          ))
        : null}
    </Wrapper>
  );
};

export default AssetLibrary;
