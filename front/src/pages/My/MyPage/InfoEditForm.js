import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "redux/userSlice";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const InfoEditForm = () => {
  const { user } = useSelector((state) => state.user);
  const [name, setName] = useState(user?.name);
  const [marketName, setMarketName] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [adress, setAdress] = useState(user?.address);

  const newPasswordValid = newPassword.length >= 8;
  const confirmPasswordValid =
    confirmPassword.length > 0 && newPassword === confirmPassword;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("userToken");
    dispatch(logout());
    navigate("/login");
  };

  return (
    <Container>
      <form>
        <InputContainer>
          <div>이름</div>
          <input
            type="text"
            value={name}
            autoComplete="off"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </InputContainer>
        <SubmitButton>이름 변경</SubmitButton>
      </form>

      <form>
        <InputContainer>
          <div>판매처 이름</div>
          <input
            type="text"
            value={marketName}
            autoComplete="off"
            onChange={(e) => {
              setMarketName(e.target.value);
            }}
          />
        </InputContainer>
        <SubmitButton>판매처 변경</SubmitButton>
      </form>

      <form>
        <InputContainer>
          <div>현재 비밀번호</div>
          <input
            type="password"
            value={password}
            autoComplete="off"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </InputContainer>
        <InputContainer>
          <div>신규 비밀번호</div>
          <input
            type="password"
            placeholder="8자 이상의 비밀번호를 입력해주세요."
            autoComplete="off"
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
            }}
          />
          <CheckIcon valid={newPasswordValid}>
            <FontAwesomeIcon icon={faCircleCheck} />
          </CheckIcon>
        </InputContainer>
        <InputContainer>
          <div>비밀번호 확인</div>
          <input
            type="password"
            value={confirmPassword}
            autoComplete="off"
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
          <CheckIcon valid={confirmPasswordValid}>
            <FontAwesomeIcon icon={faCircleCheck} />
          </CheckIcon>
        </InputContainer>
        <SubmitButton>비밀번호 변경</SubmitButton>
      </form>

      <form>
        <InputContainer>
          <div>주소</div>
          <input
            type="text"
            value={adress}
            autoComplete="off"
            onChange={(e) => {
              setAdress(e.target.value);
            }}
          />
        </InputContainer>
        <SubmitButton>주소 변경</SubmitButton>
      </form>

      <OutButtons>
        <span onClick={handleLogout}>로그아웃</span>
        <span>|</span>
        <span>회원탈퇴</span>
      </OutButtons>
    </Container>
  );
};

export default InfoEditForm;

const Container = styled.div`
  padding-bottom: 100px;
  width: 100%;
  max-width: 450px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  > form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
`;

const InputContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  height: 7vw;
  max-height: 35px;
  font-size: 3vw;
  @media (min-width: 500px) {
    font-size: 15px;
  }

  > div {
    width: 22%;
    height: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  > input {
    padding: 5px;
    width: 72%;
    height: 100%;
    background-color: #fbfbfb;
    border: 1px solid #e6e6e6;
    box-sizing: border-box;
    font-size: 2.5vw;
    @media (min-width: 500px) {
      font-size: 13px;
    }

    &:focus {
      outline: none;
    }
  }
`;

const CheckIcon = styled.div`
  position: absolute;
  right: 0;
  margin-right: -5%;
  color: ${({ valid }) => {
    if (valid) return "#70BD86;";
    else return "#E9E9E9;";
  }};
  transition: color 0.4s;
`;

const SubmitButton = styled.div`
  cursor: pointer;
  margin-bottom: 10px;
  width: 24%;
  height: 7vw;
  max-height: 35px;
  background-color: #ababab;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2.8vw;
  @media (min-width: 500px) {
    font-size: 14px;
  }
`;

const OutButtons = styled.div`
  width: 30%;
  margin-top: 7vw;
  font-size: 3vw;
  display: flex;
  justify-content: space-between;

  @media (min-width: 500px) {
    margin-top: 35px;
    font-size: 15px;
  }

  > span:first-child,
  > span:last-child {
    text-decoration-line: underline;
    cursor: pointer;
  }
`;
