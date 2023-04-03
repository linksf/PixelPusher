import { useState, useContext, useRef } from "react";
import { StateContext } from "../context/StateContext";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faCheck } from "@fortawesome/free-solid-svg-icons";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0 20px;
  color: #ecf0f1;
`;
const Title = styled.h3`
  text-align: center;
  font-size: 18px;
  font-weight: 300;
  color: #232323;
  text-transform: uppercase;
  letter-spacing: 1px;
  line-height: 18px;
`;
const Icon = styled(FontAwesomeIcon)`
  cursor: pointer;
  padding: 0 20px;
  font-size: 15px;
  color: #232323;
  @media (max-width: 768px) {
    font-size: 20px;
  }
  @media (max-width: 480px) {
    font-size: 16px;
  }
  @media (max-width: 320px) {
    font-size: 14px;
  }
`;
const Input = styled.input`
  background-color: transparent;
  outline: none;
  border: none;
  text-align: center;
  font-size: 18px;
  font-weight: 300;
  color: #232323;
  text-transform: uppercase;
  letter-spacing: 1px;
  line-height: 18px;
`;
const TitleHud = () => {
  const { title, setTitle } = useContext(StateContext);
  const [editMode, setEditMode] = useState(false);
  const handleChange = (e) => {
    setTitle(e.target.value);
  };
  const toggleEditMode = (e) => {
    const newMode = !editMode;
    setEditMode(newMode);
  };
  return (
    <Wrapper>
      {editMode ? (
        <Input value={title} onChange={handleChange} />
      ) : (
        <Title>{title}</Title>
      )}
      <Icon icon={editMode ? faCheck : faPencil} onClick={toggleEditMode} />
    </Wrapper>
  );
};

export default TitleHud;
