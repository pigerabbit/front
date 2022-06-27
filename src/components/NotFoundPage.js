import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const NotFoundPage = ({ text }) => {
  const navigate = useNavigate();

  const handleButtonClick = (path) => () => navigate(path, { replace: true });

  return (
    <Container>
      <Image
        src={`${process.env.PUBLIC_URL}/images/notFound.svg`}
        alt="no nearby"
      />
      <Text>{text}</Text>
      <Button onClick={handleButtonClick("/")}>메인페이지로</Button>
      <Button onClick={handleButtonClick(-1)}>이전페이지로</Button>
    </Container>
  );
};

export default NotFoundPage;

const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: 770px;
  min-width: 360px;
  height: 100vh;
  background-color: #fff;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  width: 50%;
`;

const Text = styled.div`
  margin-top: 5%;
  font-size: 3vw;
  @media (min-width: 770px) {
    font-size: 24px;
  }
`;

const Button = styled.button`
cursor: pointer;
  margin-top: 3%;
  width 50%;
  padding: 2% 0;
  border: none;
  border-radius: 3px;
  background-color: #FFB564;
  color: #fff;
  font-size: 3vw;
  @media (min-width: 770px) {
    font-size: 24px;
  }
`;
