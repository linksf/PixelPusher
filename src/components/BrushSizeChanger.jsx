import { useContext, useState } from "react";
import styled from "styled-components";
import { StateContext } from "../context/StateContext";
import { faPenRuler, faPenSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Wrapper = styled.div``;
const IconWrapper = styled.div`
  position: relative;
  display: flex;
  cursor: pointer;
  justify-content: center;
  align-items: center;
`;
const Icon = styled(FontAwesomeIcon)`
  font-size: ${(props) => props.fontSize};
  padding: 5px;
  cursor: pointer;
  position: relative;
  color: #6c8b93;
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

const BrushSizeChanger = () => {
  const [visible, setVisible] = useState(false);
  const {
    brushSize,
    setBrushSize,
    config,
    palette,
    currentColorIndex,
  } = useContext(StateContext);
  const { scale } = config;

  const handleChange = (e) => {
    setBrushSize(e.target.value);
  };

  const toggleVisible = (e) => {
    setVisible(!visible);
  };

  const handleBlur = (e) => {
    setVisible(false);
  };

  const incramentBrushSize = () => {
    if (brushSize < 10) {
      setBrushSize(brushSize + 1);
    }
  };
  const decrementBrushSize = () => {
    if (brushSize > 1) {
      setBrushSize(brushSize - 1);
    }
  };
  return (
    <Wrapper>
      <IconWrapper>
        <Icon icon={faPenSquare} fontSize="15px" onClick={decrementBrushSize} />
        <Input
          onBlur={handleBlur}
          type="range"
          min="1"
          max="10"
          value={brushSize}
          onChange={handleChange}
        />
        <Icon icon={faPenSquare} fontSize="25px" onClick={incramentBrushSize} />
      </IconWrapper>
    </Wrapper>
  );
};

export default BrushSizeChanger;
