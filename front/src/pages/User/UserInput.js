import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

import UserButton from "./UserButton";

const UserInput = ({
  title,
  type,
  value,
  setValue,
  isValueVlid,
  confirmButton,
}) => {
  return (
    <InputContainer>
      <InputTitle>{title}</InputTitle>
      <div>
        <Input
          width={confirmButton && "short"}
          type={type}
          value={value}
          autoComplete="off"
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
        {confirmButton && (
          <UserButton width={"short"} valid={true}>
            중복 확인
          </UserButton>
        )}
      </div>
      <CheckIcon valid={isValueVlid}>
        <FontAwesomeIcon icon={faCircleCheck} />
      </CheckIcon>
    </InputContainer>
  );
};

export default UserInput;

const InputContainer = styled.div`
  margin-top: 25px;
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
  transition: color 0.4s;
`;
