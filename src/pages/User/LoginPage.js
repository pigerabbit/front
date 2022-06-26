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
        <LogoImage
          src={`${process.env.PUBLIC_URL}/images/logo.png`}
          alt="Logo"
        />
        <Title>동구라미</Title>

        <SocialButtonContainer>
          <SocialButton></SocialButton>
          <SocialButton></SocialButton>
          <SocialButton></SocialButton>
        </SocialButtonContainer>

        <MoveButton onClick={handleLoginClick}>이메일로 로그인</MoveButton>

        <MoveButton onClick={handleRegisterClick}>회원가입</MoveButton>
      </ContentContainer>
    </Container>
  );
};

export default LoginPage;

const Container = styled.div`
  box-sizing: border-box;
  position: relative;
  width: 100%;
  max-width: 770px;
  min-width: 360px;
  min-height: 100vh;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContentContainer = styled.div`
  width: 70%;
  max-width: 400px;
  height: 80vh;
  padding-top: 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LogoImage = styled.img`
  width: 55%;
`;

const Title = styled.div`
  margin-top: 5%;
  color: #f79831;
  font-size: 6.5vw;
  @media (min-width: 570px) {
    font-size: 35px;
  }
`;

const SocialButtonContainer = styled.div`
  margin-top: 10%;
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

const MoveButton = styled.div`
  cursor: pointer;
  border: 1px solid #a1a1a1;
  border-radius: 5px;
  width: 100%;
  height: 8%;
  margin-top: 10%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  font-size: 3.4vw;
  @media (min-width: 570px) {
    font-size: 18px;
  }
`;
