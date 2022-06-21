import React, { useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import * as Api from "api";

import UserButton from "./UserButton";

const UserInput = ({
  title,
  type,
  placeholder,
  value,
  setValue,
  isValueValid,
  setIsValueValid,
  confirmButton,
  handleClick,
  noCheck,
  errMessage,
  setErrMessage,
}) => {
  const handleConfirmButtonClick = async (e) => {
    e.preventDefault();

    const data = await Api.get("users/checkName", value);
    if (data.data.payload === "none exists") {
      setIsValueValid(true);
    } else {
      setIsValueValid("again");
      setErrMessage("이미 존재하는 닉네임입니다.");
    }
  };

  useEffect(() => {
    if (setIsValueValid) {
      setIsValueValid(false);
    }
    if (setErrMessage) {
      setErrMessage("");
    }
  }, [value]);

  return (
    <InputContainer noCheck={noCheck}>
      <InputTitle>
        {title} <span>{errMessage}</span>
      </InputTitle>
      <div>
        <Input
          width={confirmButton && "short"}
          type={type}
          placeholder={placeholder}
          value={value}
          autoComplete="off"
          onChange={(e) => {
            setValue(e.target.value);
          }}
          onClick={handleClick}
        />
        {confirmButton && (
          <UserButton
            handleClick={handleConfirmButtonClick}
            width={"short"}
            valid={value.length > 0}
          >
            중복 확인
          </UserButton>
        )}
      </div>

      {!noCheck && (
        <CheckIcon valid={isValueValid}>
          <FontAwesomeIcon icon={faCircleCheck} />
        </CheckIcon>
      )}
    </InputContainer>
  );
};

export default UserInput;

const InputContainer = styled.div`
  margin-top: ${({ noCheck }) => (noCheck ? "5px;" : "25px;")}
  position: relative;
  width: 100%;
  margin-bottom: 10px;
  font-size: 3vw;
  @media (min-width: 500px) {
    font-size: 15px;
  }

  > div:nth-child(2) {
    display: flex;
  }
`;

const InputTitle = styled.div`
  margin-bottom: 5px;
  font-weight: 600;

  > span {
    color: #ff6a6a;
    font-size: 2.3vw;
    @media (min-width: 500px) {
      font-size: 11.5px;
    }
  }
`;

const Input = styled.input`
  padding: 8px;
  width: ${({ width }) => (width === "short" ? "73%;" : "100%;")};
  height: 8vw;
  max-height: 40px;
  background-color: #fbfbfb;
  border: 1px solid #e6e6e6;

  box-sizing: border-box;
  font-size: 2.8vw;
  @media (min-width: 500px) {
    font-size: 14px;
  }

  &:focus {
    outline: none;
  }

  &::-webkit-inner-spin-button {
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
  }
`;

const CheckIcon = styled.div`
  position: absolute;
  top: 54%;
  right: 0;
  margin-right: -6%;
  color: ${({ valid }) => {
    if (valid === "again") return "#FF6A6A;";
    else if (valid) return "#70BD86;";
    else return "#E9E9E9;";
  }}
  transition: color 0.4s;
`;
