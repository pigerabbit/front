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
import useShowComfirmationIcon from "hooks/useShowConfirmationIcon";

const InfoEditForm = ({ setIsOpenPopup }) => {
  const { user } = useSelector((state) => state.user);
  const [name, setName] = useState(user?.name || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(
    user?.phoneNumber?.slice(0, 3) +
      "-" +
      user?.phoneNumber?.slice(3, 7) +
      "-" +
      user?.phoneNumber?.slice(7, 11) || ""
  );
  const [address, setAddress] = useState(
    user?.address?.split(") ")[0] + ")" || ""
  );
  const [detailAddress, setDetailAddress] = useState(
    user?.address?.split(") ")[1] || ""
  );

  const [isDaumPostOpen, setIsDaumPostOpen] = useState(false);

  const [isNameValid, setIsNameValid] = useState(name);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const isAddressValid = address?.length > 0;
  const isDetailAddressValid = detailAddress?.length > 0;
  const isNewPasswordValid = newPassword.length >= 8;
  const isConfirmPasswordValid =
    confirmPassword.length >= 8 && newPassword === confirmPassword;
  const isPhoneNumberValid = phoneNumber.replaceAll("-", "").length === 11;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const showConfirmationIcon = useShowComfirmationIcon();

  const handleClickLogout = () => {
    sessionStorage.removeItem("userToken");
    dispatch(logout());
    navigate("/login");
  };

  const handleClickUnregister = () => {
    setIsOpenPopup(true);
  };

  const handleInputChange = (setValue) => {
    return (e) => {
      setValue(e.target.value);
    };
  };

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value;
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

  const isEmptyValue = (obj) => {
    if (obj.constructor === Object && Object.values(obj)[0].length === 0) {
      return true;
    }
    return false;
  };

  const handleUpdate = async (
    updateValueObj,
    setValueValid,
    isPassword = false
  ) => {
    try {
      if (isEmptyValue(updateValueObj)) return;

      const endpoint = isPassword
        ? `users/${user.id}/changePassword`
        : `users/${user.id}`;
      const res = await Api.put(endpoint, updateValueObj);

      if (!isPassword) {
        dispatch(update(res.data.payload));
      } else {
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }

      showConfirmationIcon({
        backgroundColor: "#70BD86;",
        color: "white",
        icon: faCheck,
        text: "완료!",
      });
    } catch (error) {
      setValueValid("again");
      showConfirmationIcon({
        backgroundColor: "#FF6A6A;",
        color: "white",
        icon: faXmark,
        text: "다시!",
      });
    }
  };

  const handleSubmit = (updateValueObj, setValueValid, isPassword = false) => {
    return (e) => {
      e.preventDefault();
      handleUpdate(updateValueObj, setValueValid, isPassword);
    };
  };

  useEffect(() => {
    setIsNameValid(name?.length > 0);
  }, [name]);

  useEffect(() => {
    setIsPasswordValid(currentPassword?.length >= 8);
  }, [currentPassword]);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setAddress(user.address?.split(") ")[0] + ")");
      setDetailAddress(user.address?.split(") ")[1]);
      setPhoneNumber(
        user.phoneNumber?.slice(0, 3) +
          "-" +
          user.phoneNumber?.slice(3, 7) +
          "-" +
          user.phoneNumber?.slice(7, 11) || ""
      );
    }
  }, [user]);

  return (
    <Container>
      <form onSubmit={handleSubmit({ name }, setIsNameValid)}>
        <InputContainer>
          <div>이름</div>
          <input
            type="text"
            value={name || ""}
            autoComplete="off"
            onChange={handleInputChange(setName)}
          />
          <CheckIcon valid={isNameValid}>
            <FontAwesomeIcon icon={faCircleCheck} />
          </CheckIcon>
        </InputContainer>
        <SubmitButton type="submit" disabled={!isNameValid}>
          이름 변경
        </SubmitButton>
      </form>

      <form
        onSubmit={handleSubmit(
          { currentPassword, newPassword },
          setIsPasswordValid,
          true
        )}
      >
        <InputContainer>
          <div>현재 비밀번호</div>
          <input
            type="password"
            value={currentPassword}
            autoComplete="off"
            onChange={handleInputChange(setCurrentPassword)}
          />
          <CheckIcon valid={isPasswordValid}>
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
            onChange={handleInputChange(setNewPassword)}
          />
          <CheckIcon valid={isNewPasswordValid}>
            <FontAwesomeIcon icon={faCircleCheck} />
          </CheckIcon>
        </InputContainer>
        <InputContainer>
          <div>비밀번호 확인</div>
          <input
            type="password"
            value={confirmPassword}
            autoComplete="off"
            onChange={handleInputChange(setConfirmPassword)}
          />
          <CheckIcon valid={isConfirmPasswordValid}>
            <FontAwesomeIcon icon={faCircleCheck} />
          </CheckIcon>
        </InputContainer>
        <SubmitButton
          type="submit"
          disabled={
            !(isPasswordValid && isNewPasswordValid && isConfirmPasswordValid)
          }
        >
          비밀번호 변경
        </SubmitButton>
      </form>

      <form
        onSubmit={handleSubmit({
          phoneNumber: phoneNumber.replaceAll("-", ""),
        })}
      >
        <InputContainer>
          <div>전화번호</div>
          <input
            type="text"
            value={phoneNumber}
            autoComplete="off"
            onChange={handlePhoneNumberChange}
          />
          <CheckIcon valid={isPhoneNumberValid}>
            <FontAwesomeIcon icon={faCircleCheck} />
          </CheckIcon>
        </InputContainer>
        <SubmitButton type="submit" disabled={!isPhoneNumberValid}>
          전화번호 변경
        </SubmitButton>
      </form>

      <form onSubmit={handleSubmit({ address: address + " " + detailAddress })}>
        <InputContainer>
          <div>주소</div>
          <input
            type="text"
            value={address}
            autoComplete="off"
            readOnly
            onClick={handleAddressInputClick}
          />
          <CheckIcon valid={isAddressValid}>
            <FontAwesomeIcon icon={faCircleCheck} />
          </CheckIcon>
        </InputContainer>
        <InputContainer>
          <div>상세주소</div>
          <input
            type="text"
            value={detailAddress}
            autoComplete="off"
            onChange={handleInputChange(setDetailAddress)}
          />
          <CheckIcon valid={isDetailAddressValid}>
            <FontAwesomeIcon icon={faCircleCheck} />
          </CheckIcon>
        </InputContainer>
        <SubmitButton
          type="submit"
          disabled={!(isAddressValid && isDetailAddressValid)}
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
        <span onClick={handleClickLogout}>로그아웃</span>
        <span>|</span>
        <span onClick={handleClickUnregister}>회원탈퇴</span>
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
