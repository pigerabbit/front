import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import * as Api from "api";

import UserTopBar from "./UserTopBar";
import UserInput from "./UserInput";
import UserButton from "./UserButton";
import FindePwModal from "./FindPwModal";
import validateEmail from "utils/validateEmail";

const EmailLoginPage = () => {
  const [isFindPwModalOpen, setIsFindPwModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailErrMessage, setEmailErrMessage] = useState("");
  const [passwordErrMessage, setPasswordErrMessage] = useState("");

  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const isFormValid = isEmailValid && isPasswordValid;

  const navigate = useNavigate();

  const handleFindPwClick = () => {
    setIsFindPwModalOpen(true);
  };

  const handleLoginClick = async (event) => {
    event.preventDefault();

    try {
      const res = await Api.post("users/login", {
        email,
        password,
      });

      const jwtToken = res.data.payload.token;
      sessionStorage.setItem("userToken", jwtToken);
      navigate("/");
    } catch (error) {
      if (
        error.response.data ===
        "해당 계정은 가입 내역이 없습니다. 다시 한 번 확인해 주세요."
      ) {
        setIsEmailValid("again");
        setEmailErrMessage(error.response.data);
      } else if (
        error.response.data ===
        "비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요."
      ) {
        setIsPasswordValid("again");
        setPasswordErrMessage(error.response.data);
      } else if (error.response.data === "해당 계정은 이미 탈퇴하였습니다.") {
        setIsEmailValid("again");
        setEmailErrMessage(error.response.data);
      }
    }
  };

  const handleRegisterClick = () => {
    navigate("/register/user");
  };

  useEffect(() => {
    setIsEmailValid(validateEmail(email));
    setEmailErrMessage("");
  }, [email]);

  useEffect(() => {
    setIsPasswordValid(password.length >= 8);
    setPasswordErrMessage("");
  }, [password]);

  return (
    <>
      <Container>
        <UserTopBar pageName={"이메일로 로그인"} />

        <Form>
          <InputListContainter>
            <UserInput
              title="이메일"
              type="text"
              value={email}
              setValue={setEmail}
              isValueValid={isEmailValid}
              errMessage={emailErrMessage}
            />

            <UserInput
              title="비밀번호"
              type="password"
              value={password}
              setValue={setPassword}
              isValueValid={isPasswordValid}
              errMessage={passwordErrMessage}
            />
          </InputListContainter>

          <UserButton
            handleClick={handleLoginClick}
            valid={isFormValid}
            width={"long"}
          >
            로그인
          </UserButton>
          <ButtonsContainer>
            <span onClick={handleFindPwClick}>비밀번호 찾기</span>
            <span onClick={handleRegisterClick}>이메일로 회원가입</span>
          </ButtonsContainer>
        </Form>
      </Container>

      {isFindPwModalOpen && (
        <FindePwModal setIsFindPwModalOpen={setIsFindPwModalOpen} />
      )}
    </>
  );
};

export default EmailLoginPage;

const Container = styled.div`
  border: 2px solid blue;
  position: relative;
  width: 100%;
  max-width: 770px;
  min-width: 360px;
  height: 100vh;
  min-height: 700px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Form = styled.form`
  border: 2px solid red;
  width: 100%;
  height: 90vh;
  min-height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const InputListContainter = styled.div`
  width: 70%;
  max-width: 400px;
  margin-bottom: 10%;
`;

const ButtonsContainer = styled.div`
  width: 70%;
  max-width: 400px;
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  font-size: 2.6vw;
  @media (min-width: 500px) {
    font-size: 14px;
  }

  > span {
    cursor: pointer;
  }
`;
