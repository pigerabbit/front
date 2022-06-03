import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import * as Api from "api";

import UserTopBar from "./UserTopBar";
import UserInput from "./UserInput";
import UserButton from "./UserButton";

const EmailLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailErrMessage, setEmailErrMessage] = useState("");
  const [passwordErrMessage, setPasswordErrMessage] = useState("");

  const validateEmail = (email) => {
    return email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const isFormValid = isEmailValid && isPasswordValid;

  const navigate = useNavigate();

  const handleLoginClick = async (event) => {
    event.preventDefault();

    try {
      const res = await Api.post("user/login", {
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
      }
    }
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
    <Container>
      <UserTopBar pageName={"이메일로 로그인"} />

      <InputListContainter>
        <UserInput
          title="이메일"
          type="test"
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
      <MoveButtonsContainer>
        <span>비밀번호 찾기</span>
        <span
          onClick={() => {
            navigate("/register");
          }}
        >
          이메일로 회원가입
        </span>
      </MoveButtonsContainer>
    </Container>
  );
};

export default EmailLoginPage;

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
  justify-content: center;
`;

const InputListContainter = styled.form`
  width: 70%;
  max-width: 400px;
  margin-bottom: 10%;
`;

const MoveButtonsContainer = styled.div`
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
