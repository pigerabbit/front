import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

import UserTopBar from "./UserTopBar";
import UserInput from "./UserInput";
import UserButton from "./UserButton";

const RegisterPage = ({ children, pageName }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  const validateEmail = (email) => {
    return email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const [isNameValid, setIsNameValid] = useState(false);
  const isEmailValid = validateEmail(email);
  const isPasswordValid = password.length >= 8;
  const isPasswordSame =
    confirmPassword.length > 0 && password === confirmPassword;
  const isAddressValid = address.length > 0;
  const isFormValid =
    isNameValid &&
    isEmailValid &&
    isPasswordValid &&
    isPasswordSame &&
    isAddressValid;

  return (
    <Container>
      <UserTopBar pageName={"회원가입"} />
      <InputListContainter>
        <UserInput
          title={"이메일"}
          type="test"
          value={email}
          setValue={setEmail}
          isValueValid={isEmailValid}
        />

        <UserInput
          title={"비밀번호"}
          type="password"
          value={password}
          setValue={setPassword}
          isValueValid={isPasswordValid}
        />

        <UserInput
          title={"비밀번호 확인"}
          type="password"
          value={confirmPassword}
          setValue={setConfirmPassword}
          isValueValid={isPasswordSame}
        />

        <UserInput
          title={"이름(닉네임)"}
          type="text"
          value={name}
          setValue={setName}
          isValueValid={isNameValid}
          setIsValueValid={setIsNameValid}
          confirmButton={true}
        />

        <UserInput
          title={"주소"}
          type="text"
          value={address}
          setValue={setAddress}
          isValueVlid={isAddressValid}
        />
      </InputListContainter>

      <UserButton valid={isFormValid} width={"long"}>
        회원가입하기
      </UserButton>
    </Container>
  );
};

export default RegisterPage;

const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: 770px;
  min-width: 360px;
  min-height: 750px;
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
