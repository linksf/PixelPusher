import { useContext, useState } from "react";
import styled from "styled-components";
import { StateContext } from "../context/StateContext";
import { faPenRuler } from "@fortawesome/free-solid-svg-icons";
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
  font-size: 25px;
  padding: 5px;
  cursor: pointer;
  position: relative;
  color: #ecf0f1;
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
const Input = styled.input``;
const HiddenWrapper = styled.div`
  opacity: ${(props) => (props.visible ? "1" : "0")};
  display: flex;
  flex-direction: column;
`;

const BrushSizeChanger = () => {
  const [visible, setVisible] = useState(false);
  const { brushSize, setBrushSize } = useContext(StateContext);

  const handleChange = (e) => {
    setBrushSize(e.target.value);
  };

  const toggleVisible = (e) => {
    setVisible(!visible);
  };

  const handleBlur = (e) => {
    setVisible(false);
  };

  return (
    <Wrapper>
      <IconWrapper>
        <Icon icon={faPenRuler} onClick={toggleVisible} />
        <Value>{brushSize}</Value>
      </IconWrapper>
      <HiddenWrapper visible={visible}>
        <Lable>Brush Size</Lable>
        <Input
          onBlur={handleBlur}
          type="range"
          min="1"
          max="10"
          value={brushSize}
          onChange={handleChange}
        />
      </HiddenWrapper>
    </Wrapper>
  );
};

export default BrushSizeChanger;
