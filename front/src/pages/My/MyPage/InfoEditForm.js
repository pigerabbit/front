import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout, update } from "redux/userSlice";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCheck,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import * as Api from "api";

import DaumPost from "components/DaumPostCode";

const InfoEditForm = ({ setIsOpenPopup, setConfirmationIcon }) => {
  const { user } = useSelector((state) => state.user);
  const [name, setName] = useState(user?.name);
  const [businessName, setBusinessName] = useState(
    user?.business[0].businessName || ""
  );
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState(user?.address.split(") ")[0] + ")");
  const [detailAddress, setDetailAddress] = useState(
    user?.address.split(") ")[1]
  );

  const [isDaumPostOpen, setIsDaumPostOpen] = useState(false);

  const [nameValid, setNameValid] = useState(name);
  const [businessNameValid, setBusinessNameValid] = useState(businessName);
  const [passwordValid, setPasswordValid] = useState(false);
  const addressValid = address?.length > 0;
  const detailAddressValid = detailAddress?.length > 0;
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

  const unShowIcon = () => {
    setTimeout(() => {
      setConfirmationIcon((cur) => {
        return { ...cur, show: false };
      });
    }, 1600);
  };

  const CompleteIconShow = () => {
    setConfirmationIcon({
      show: true,
      backgroundColor: "#70BD86;",
      color: "white",
      icon: faCheck,
      text: "완료!",
    });

    unShowIcon();
  };

  const AgainIconShow = () => {
    setConfirmationIcon({
      show: true,
      backgroundColor: "#FF6A6A;",
      color: "white",
      icon: faXmark,
      text: "다시!",
    });

    unShowIcon();
  };

  const isEmptyValue = (obj) => {
    if (obj.constructor === Object && Object.values(obj)[0].length === 0) {
      return true;
    }
    return false;
  };

  const handleUpdate = (updateValueObj, setValueValid, password = false) => {
    return async () => {
      try {
        if (isEmptyValue(updateValueObj)) return;

        const url = password
          ? `users/${user.id}/changePassword`
          : `users/${user.id}`;
        const res = await Api.put(url, updateValueObj);

        if (!password) {
          dispatch(update(res.data.payload));
        } else {
          setCurrentPassword("");
          setNewPassword("");
          setConfirmPassword("");
        }

        CompleteIconShow();
      } catch (error) {
        setValueValid("again");
        AgainIconShow();
      }
    };
  };

  useEffect(() => {
    setNameValid(name?.length > 0);
  }, [name]);

  useEffect(() => {
    setBusinessNameValid(businessName?.length > 0);
  }, [businessName]);

  useEffect(() => {
    setPasswordValid(currentPassword?.length >= 8);
  }, [currentPassword]);

  return (
    <Container>
      <form onSubmit={(e) => e.preventDefault()}>
        <InputContainer>
          <div>이름</div>
          <input
            type="text"
            value={name || ""}
            autoComplete="off"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <CheckIcon valid={nameValid}>
            <FontAwesomeIcon icon={faCircleCheck} />
          </CheckIcon>
        </InputContainer>
        <SubmitButton
          onClick={handleUpdate({ name }, setNameValid)}
          disabled={!nameValid}
        >
          이름 변경
        </SubmitButton>
      </form>

      {user?.seller && (
        <form onSubmit={(e) => e.preventDefault()}>
          <InputContainer>
            <div>판매처 이름</div>
            <input
              type="text"
              value={businessName}
              autoComplete="off"
              onChange={(e) => {
                setBusinessName(e.target.value);
              }}
            />
            <CheckIcon valid={businessNameValid}>
              <FontAwesomeIcon icon={faCircleCheck} />
            </CheckIcon>
          </InputContainer>
          <SubmitButton
            onClick={handleUpdate({ businessName }, setBusinessNameValid)}
            disabled={!businessNameValid}
          >
            판매처 변경
          </SubmitButton>
        </form>
      )}

      <form onSubmit={(e) => e.preventDefault()}>
        <InputContainer>
          <div>현재 비밀번호</div>
          <input
            type="password"
            value={currentPassword}
            autoComplete="off"
            onChange={(e) => {
              setCurrentPassword(e.target.value);
            }}
          />
          <CheckIcon valid={passwordValid}>
            <FontAwesomeIcon icon={faCircleCheck} />
          </CheckIcon>
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
        <SubmitButton
          onClick={handleUpdate(
            { currentPassword, newPassword },
            setPasswordValid,
            true
          )}
          disabled={
            !(passwordValid && newPasswordValid && confirmPasswordValid)
          }
        >
          비밀번호 변경
        </SubmitButton>
      </form>

      <form onSubmit={(e) => e.preventDefault()}>
        <InputContainer>
          <div>주소</div>
          <input
            type="text"
            value={address}
            autoComplete="off"
            onChange={(e) => {
              setAddress(e.target.value);
            }}
            onClick={() => {
              setIsDaumPostOpen(true);
            }}
          />
          <CheckIcon valid={addressValid}>
            <FontAwesomeIcon icon={faCircleCheck} />
          </CheckIcon>
        </InputContainer>
        <InputContainer>
          <div>상세주소</div>
          <input
            type="text"
            value={detailAddress}
            autoComplete="off"
            onChange={(e) => {
              setDetailAddress(e.target.value);
            }}
          />
          <CheckIcon valid={detailAddressValid}>
            <FontAwesomeIcon icon={faCircleCheck} />
          </CheckIcon>
        </InputContainer>
        <SubmitButton
          onClick={handleUpdate({ address: address + " " + detailAddress })}
          disabled={!(addressValid && detailAddressValid)}
        >
          주소 변경
        </SubmitButton>
      </form>

      {isDaumPostOpen && (
        <DaumPost
          setAddress={setAddress}
          setIsDaumPostOpen={setIsDaumPostOpen}
        />
      )}

      <OutButtons>
        <span onClick={handleLogout}>로그아웃</span>
        <span>|</span>
        <span
          onClick={() => {
            setIsOpenPopup(true);
          }}
        >
          회원탈퇴
        </span>
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
    if (valid === "again") return "#FF6A6A;";
    else if (valid) return "#70BD86;";
    else return "#E9E9E9;";
  }};
  transition: color 0.4s;
`;

const SubmitButton = styled.button`
  ${({ disabled }) => !disabled && "cursor: pointer;"}
  border: none;
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
