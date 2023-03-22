import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBars } from "@fortawesome/free-solid-svg-icons";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 20px;
  color: #ecf0f1;
`;
const Title = styled.h1`
  text-align: center;
`;
const Icon = styled(FontAwesomeIcon)`
  cursor: pointer;
  padding: 0 20px;
  font-size: 25px;
`;

const TitleHud = () => {
  return (
    <Wrapper>
      <Icon icon={faBars} />
      <Title>Pixel Pusher</Title>
      <Icon icon={faUser} />
    </Wrapper>
  );
};

export default TitleHud;
