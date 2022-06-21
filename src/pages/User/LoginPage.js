import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import UserTopBar from "./UserTopBar";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("email");
  };

  const handleRegisterClick = () => {
    navigate("/register/user");
  };

  return (
    <Container>
      <UserTopBar pageName={"로그인"} />

      <ContentContainer>
        <Title>동구라미</Title>

        <SocialButtonContainer>
          <SocialButton></SocialButton>
          <SocialButton></SocialButton>
          <SocialButton></SocialButton>
        </SocialButtonContainer>

        <ButtonContainter>
          <MoveButton onClick={handleLoginClick}>이메일로 로그인</MoveButton>
        </ButtonContainter>

        <ButtonContainter>
          <span>아직 동구라미 회원이 아니신가요?</span>
          <MoveButton onClick={handleRegisterClick}>회원가입</MoveButton>
        </ButtonContainter>
      </ContentContainer>
    </Container>
  );
};

export default LoginPage;

const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: 770px;
  min-width: 360px;
  min-height: 700px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContentContainer = styled.div`
  width: 70%;
  max-width: 400px;
  height: 50%;
  margin-top: 10%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.div`
  color: #f79831;
  font-size: 7vw;
  @media (min-width: 570px) {
    font-size: 40px;
  }
`;

const SocialButtonContainer = styled.div`
  margin-bottom: -20%;
  width: 70%;
  height: 12.2vw;
  @media (min-width: 570px) {
    height: 70px;
  }
  display: flex;
  justify-content: space-between;
`;

const SocialButton = styled.div`
  background-color: #ffe9d1;
  width: 25%;
  height: 100%;
  border-radius: 50%;
`;

const ButtonContainter = styled.div`
  position: relative;
  width: 100%;
  height: 10%;
  font-size: 3vw;
  @media (min-width: 570px) {
    font-size: 17px;
  }

  > span {
    position: absolute;
    left: 22%;
    top: -55%;
  }
`;

const MoveButton = styled.div`
  cursor: pointer;
  border: 1px solid #a1a1a1;
  border-radius: 5px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
