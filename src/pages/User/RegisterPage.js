import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import * as Api from "api";

import UserTopBar from "./UserTopBar";
import UserInput from "./UserInput";
import UserButton from "./UserButton";
import DaumPost from "../../components/DaumPostCode";
import validateEmail from "utils/validateEmail";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [detailAddress, setDetailAddress] = useState("");

  const [nameErrMessage, setNameErrMessage] = useState("");
  const [emailErrMessage, setEmailErrMessage] = useState("");
  const [isDaumPostOpen, setIsDaumPostOpen] = useState(false);

  const [isNameValid, setIsNameValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const isPasswordValid = password.length >= 8;
  const isPasswordSame =
    confirmPassword.length > 0 && password === confirmPassword;
  const isPhoneNumberValid = phoneNumber.replaceAll("-", "").length === 11;
  const isAddressValid = address.length > 0 && detailAddress.length > 0;
  const isFormValid =
    isNameValid === true &&
    isEmailValid &&
    isPasswordValid &&
    isPasswordSame &&
    isPhoneNumberValid &&
    isAddressValid;

  const navigate = useNavigate();

  const handleNameChange = (value) => {
    if (value[value.length - 1] === "_") return;

    setName(value);
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

  const handleAddressInputClick = () => {
    setIsDaumPostOpen(true);
  };

  const handleRegisterClick = async (event) => {
    event.preventDefault();

    try {
      await Api.post("users", {
        name,
        email,
        password,
        phoneNumber: phoneNumber.replaceAll("-", ""),
        address: address + " " + detailAddress,
      });

      navigate("/login/email");
    } catch (error) {
      setIsEmailValid("again");
      setEmailErrMessage("?????? ???????????? ??????????????????.");
    }
  };

  useEffect(() => {
    setIsEmailValid(validateEmail(email));
    setEmailErrMessage("");
  }, [email]);

  return (
    <Container>
      <UserTopBar pageName={"????????????"} />
      <InputListContainter>
        <UserInput
          title="?????????"
          type="text"
          value={email}
          setValue={setEmail}
          isValueValid={isEmailValid}
          errMessage={emailErrMessage}
        />

        <UserInput
          title="????????????"
          type="password"
          placeholder="8??? ????????? ??????????????? ??????????????????."
          value={password}
          setValue={setPassword}
          isValueValid={isPasswordValid}
        />

        <UserInput
          title={"???????????? ??????"}
          type="password"
          value={confirmPassword}
          setValue={setConfirmPassword}
          isValueValid={isPasswordSame}
        />

        <UserInput
          title="??????(?????????)"
          type="text"
          value={name}
          setValue={handleNameChange}
          isValueValid={isNameValid}
          setIsValueValid={setIsNameValid}
          confirmButton={true}
          errMessage={nameErrMessage}
          setErrMessage={setNameErrMessage}
        />

        <UserInput
          title="????????? ??????"
          type="text"
          value={phoneNumber}
          setValue={handlePhoneNumberChange}
          isValueValid={isPhoneNumberValid}
        />

        <UserInput
          title="??????"
          type="text"
          value={address}
          isValueValid={isAddressValid}
          handleClick={handleAddressInputClick}
        />

        <UserInput
          type="text"
          value={detailAddress}
          placeholder="?????? ????????? ??????????????????."
          setValue={setDetailAddress}
          noCheck={true}
        />
      </InputListContainter>

      {isDaumPostOpen && (
        <DaumPost
          setAddress={setAddress}
          setIsDaumPostOpen={setIsDaumPostOpen}
        />
      )}

      <UserButton
        handleClick={handleRegisterClick}
        valid={isFormValid}
        width={"long"}
      >
        ??????????????????
      </UserButton>
    </Container>
  );
};

export default RegisterPage;

const Container = styled.div`
  box-sizing: border-box;
  position: relative;
  width: 100%;
  max-width: 770px;
  min-width: 360px;
  min-height: 100vh;
  padding-bottom: 5%;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputListContainter = styled.form`
  width: 70%;
  max-width: 400px;
  margin-top: 10%;
  margin-bottom: 5%;
`;
