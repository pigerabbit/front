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
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [isFindPwModalOpen, setIsFindPwModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailErrMessage, setEmailErrMessage] = useState("");
  const [passwordErrMessage, setPasswordErrMessage] = useState("");

  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const isFormValid = isEmailValid && isPasswordValid;

  const navigate = useNavigate();

  const handleInputClick = () => {
    setIsGuideOpen(true);
  };

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
            {isGuideOpen && (
              <Guide>
                <div>코치님들의 평가를 위한 임시계정입니다.</div>
                <div>
                  이메일: test(1~5의 숫자)@test.com (ex. test4@test.com)
                </div>
                <div>비밀번호: 1q2w3e4r</div>
                <br />
                <div>
                  * 위 계정들은 사업자인증이 완료되어 판매페이지를 볼 수
                  있습니다.
                </div>
                <div>
                  * 새로 회원가입을 하시면 사업자인증이 되어 있지 않습니다.
                </div>
                <div>&nbsp;&nbsp;(따라서 판매등록 및 관리가 불가합니다.)</div>
                <div>
                  * 마이페이지에 사업자인증 버튼 혹은 나의판매 버튼이 있습니다.
                </div>
              </Guide>
            )}

            <UserInput
              title="이메일"
              type="text"
              value={email}
              setValue={setEmail}
              isValueValid={isEmailValid}
              errMessage={emailErrMessage}
              handleClick={handleInputClick}
            />

            <UserInput
              title="비밀번호"
              type="password"
              value={password}
              setValue={setPassword}
              isValueValid={isPasswordValid}
              errMessage={passwordErrMessage}
              handleClick={handleInputClick}
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
  width: 100%;
  height: 90vh;
  min-height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const InputListContainter = styled.div`
  position: relative;
  width: 70%;
  max-width: 400px;
  margin-bottom: 10%;
`;

const Guide = styled.div`
  position: absolute;
  top: -160px;
  width: 100%;
  max-width: 400px;
  height: 160px;
  padding: 15px;
  box-sizing: border-box;
  background-color: #fff;
  box-shadow: 0 0 8px #e9e9e9;
  border-radius: 10px;
  font-size: 2.45vw;
  @media (min-width: 580px) {
    font-size: 13.5px;
  }
  line-height: 1.2;
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
