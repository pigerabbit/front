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
}) => {
  const handleConfirmButtonClick = async (e) => {
    e.preventDefault();

    const data = await Api.get("users/checkName", "value");
    if (data.data.payload === "none exists") {
      setIsValueValid(true);
    } else {
      setIsValueValid("again");
    }
  };

  useEffect(() => {
    if (setIsValueValid) {
      setIsValueValid(false);
    }
  }, [value]);

  return (
    <InputContainer onClick={handleClick} noCheck={noCheck}>
      <InputTitle>{title}</InputTitle>
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
`;

const CheckIcon = styled.div`
  position: absolute;
  top: 54%;
  right: 0;
  margin-right: -6%;
  color: ${({ valid }) => (valid ? "#70BD86;" : "#E9E9E9;")};
  color: ${({ valid }) => {
    if (valid === "again") return "#FF6A6A;";
    else if (valid) return "#70BD86;";
    else return "#E9E9E9;";
  }}
  transition: color 0.4s;
`;
