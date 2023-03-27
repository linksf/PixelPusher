import { useContext, useState } from "react";
import styled from "styled-components";
import { StateContext } from "../context/StateContext";
import {
  faMagnifyingGlassMinus,
  faMagnifyingGlassPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Wrapper = styled.div`
  margin: 0 15px;
`;
const IconWrapper = styled.div`
  position: relative;
  display: flex;
  cursor: pointer;
  justify-content: center;
  align-items: center;
`;
const Icon = styled(FontAwesomeIcon)`
  font-size: 20px;
  padding: 0px;
  cursor: pointer;
  position: relative;
  color: #232323;
`;
const Lable = styled.label`
  color: #ecf0f1;
`;
const Value = styled.p`
  font-size: 20px;
  position: relative;
  color: #ecf0f1;
  text-shadow: 0 0 5px #000000;
`;
const Input = styled.input`
  width: 75px;
`;
const Input2 = styled.input`
  -webkit-appearance: none; /* Hides the slider so that custom slider can be made */
  width: 100%; /* Specific width is required for Firefox. */
  background: transparent;
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
  }
  &::-ms-track {
    width: 100%;
    cursor: pointer;
    background: transparent;
    border-color: transparent;
    color: transparent;
  }
  &:focus {
    outline: none;
  }
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: ${(props) => props.value * props.scale}px;
    width: ${(props) => props.value * props.scale}px;
    background: ${(props) => props.thumbColor};
    cursor: pointer;
    margin-top: -14px;
  }
`;
const HiddenWrapper = styled.div`
  opacity: ${(props) => (props.visible ? "1" : "0")};
  display: flex;
  flex-direction: column;
`;

const ZoomRange = () => {
  const [visible, setVisible] = useState(false);
  const {
    brushSize,
    setBrushSize,
    config,
    palette,
    currentColorIndex,
    scaleMod,
    setScaleMod,
  } = useContext(StateContext);
  const { scale } = config;

  const handleChange = (e) => {
    setScaleMod(+e.target.value);
  };

  const toggleVisible = (e) => {
    setVisible(!visible);
  };

  const handleBlur = (e) => {
    setVisible(false);
  };

  const zoomIn = (e) => {
    setScaleMod(Math.min(scaleMod + 1, scale));
  };

  const zoomOut = (e) => {
    setScaleMod(Math.max(scaleMod - 1, 0));
  };
  return (
    <Wrapper>
      <IconWrapper>
        <Icon icon={faMagnifyingGlassMinus} fontSize="25px" onClick={zoomIn} />
        <Input
          onBlur={handleBlur}
          type="range"
          min="1"
          max="20"
          value={scaleMod}
          onChange={handleChange}
        />
        <Icon icon={faMagnifyingGlassPlus} fontSize="25px" onClick={zoomOut} />
      </IconWrapper>
    </Wrapper>
  );
};

export default ZoomRange;
