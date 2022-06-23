import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import * as Api from "api";

import UserInput from "./UserInput";
import UserButton from "./UserButton";
import validateEmail from "utils/validateEmail";

const FindePwModal = ({ setIsFindPwModalOpen }) => {
  const [success, setSucces] = useState(false);
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [emailErrMessage, setEmailErrMessage] = useState("");
  const [phoneNumberErrMessage, setPhoneNumberErrMessage] = useState("");
  const isEmailValid = validateEmail(email);
  const isPhoneNumberValid = phoneNumber.replaceAll("-", "").length === 11;
  const isFormValid = isEmailValid && isPhoneNumberValid;

  const handleListClose = () => {
    setIsFindPwModalOpen(false);
  };

  const handlePhoneNumberChange = (value) => {
    if (value.length > 13) return;

    setPhoneNumber(
      value
        .replace(/[^0-9]/g, "")
        .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3")
        .replace(/(\-{1,2})$/g, "")
    );
  };

  const handleFindPwButtonClick = async (e) => {
    e.preventDefault();

    const bodyData = { phoneNumber: phoneNumber.replaceAll("-", "") };

    try {
      //   const res = await Api.post(
      //     `users/email/${email}/resetPassword`,
      //     bodyData
      //   );
      setSucces(true);
    } catch (e) {
      if (e.response.data === "해당 메일로 가입된 사용자가 없습니다.")
        setEmailErrMessage(e.response.data);
      else if (e.response.data === "전화번호가 일치하지 않습니다.")
        setPhoneNumberErrMessage(e.response.data);
    }
  };

  useEffect(() => {
    setEmailErrMessage("");
  }, [email]);

  useEffect(() => {
    setPhoneNumberErrMessage("");
  }, [phoneNumber]);

  return (
    <Background>
      <Container>
        <FontAwesomeIcon icon={faXmark} onClick={handleListClose} />

        <Title>비밀번호 찾기</Title>

        {success ? (
          <SuccessContainer>
            <SuccessImage
              src={`${process.env.PUBLIC_URL}/images/success.svg`}
              alt="success"
            />
            <SuccessText>임시 비밀번호가 전송되었습니다.</SuccessText>
          </SuccessContainer>
        ) : (
          <Form>
            <InputsContainer>
              <UserInput
                title="이메일"
                type="text"
                value={email}
                setValue={setEmail}
                isValueValid={isEmailValid}
                errMessage={emailErrMessage}
                placeholder="비밀번호를 찾고자 하는 이메일을 입력해 주세요."
              />

              <UserInput
                title="전화번호"
                type="text"
                value={phoneNumber}
                setValue={handlePhoneNumberChange}
                isValueValid={isPhoneNumberValid}
                errMessage={phoneNumberErrMessage}
                placeholder="회원가입시 입력한 전화번호를 입력해 주세요."
              />
            </InputsContainer>

            <UserButton
              handleClick={handleFindPwButtonClick}
              valid={isFormValid}
              width={"long"}
            >
              이메일로 임시 비밀번호 발급
            </UserButton>
          </Form>
        )}
      </Container>
    </Background>
  );
};

export default FindePwModal;

const Background = styled.div`
  z-index: 12;
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.2);
`;

const Container = styled.div`
  position: relative;
  width: 80%;
  max-width: 600px;
  height: 50%;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;

  > svg {
    cursor: pointer;
    position: absolute;
    top: 1%;
    right: 2%;
    color: #a7a7a7;
    font-size: 5vw;
    @media (min-width: 600px) {
      font-size: 26px;
    }
  }
`;

const Title = styled.div`
  border-bottom: 1px solid #d3d3d3;
  box-sizing: border-box;
  width: 100%;
  height: 18%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 4vw;
  @media (min-width: 600px) {
    font-size: 21px;
  }
`;

const Form = styled.form`
  box-sizing: border-box;
  width: 100%;
  height: 82%;
  padding: 0 15%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const InputsContainer = styled.div`
  width: 100%;
  margin-bottom: 10%;
`;

const SuccessContainer = styled.div`
  width: 100%;
  height: 82%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SuccessImage = styled.img`
  width: 35%;
`;

const SuccessText = styled.div`
  margin-top: 5%;
  font-size: 4vw;
  @media (min-width: 600px) {
    font-size: 24px;
  }
`;
