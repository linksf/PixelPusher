import { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import { StateContext } from "../context/StateContext";

const Wrapper = styled.div`
  display: grid;
  place-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  z-index: 1000;
`;
const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;

  background-color: #ecf0f1;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  padding: 20px;
`;
const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;
const ModalTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #232323;
  text-align: center;
`;

const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
`;

const ModalButton = styled.button`
  font-size: 1rem;
  font-weight: 600;
  color: #ecf0f1;
  background-color: #454545;
  border: none;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
  outline: none;
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: #232323;
    color: #ecf0f1;
  }
  &:active {
    background-color: #000000;
    color: #ecf0f1;
  }
`;
const Input = styled.input`
  font-size: 1rem;
  font-weight: 600;
  color: #232323;
  background-color: #ecf0f1;
  border: none;
  border-radius: 5px;
  padding: 10px;
`;
const CloseIcon = styled(FontAwesomeIcon)`
  font-size: 20px;
  color: palevioletred;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  position: absolute;
  top: 10px;
  right: 10px;
  &:hover {
    color: rgb(168, 82, 111);
  }
`;

const Promp = ({ title, buttonText, callback, closer }) => {
  const [inputValue, setInputValue] = useState("");
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    callback(inputValue);
    closer();
  };
  return (
    <Wrapper>
      <Modal>
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
          <CloseIcon onClick={closer} icon={faTimes} />
        </ModalHeader>
        <ModalBody>
          <Input
            type="text"
            placeholder="Title of frames"
            value={inputValue}
            onChange={handleChange}
          />
        </ModalBody>
        <ModalFooter>
          <ModalButton onClick={handleSubmit}>{buttonText}</ModalButton>
        </ModalFooter>
      </Modal>
    </Wrapper>
  );
};

export default Promp;
