import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { update } from "redux/userSlice";
import styled from "styled-components";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import * as Api from "api";

import UserTopBar from "./UserTopBar";
import UserInput from "./UserInput";
import UserButton from "./UserButton";
import DaumPost from "components/DaumPostCode";
import ConfirmationIcon from "components/ConfirmationIcon";

const BusinessAuthPage = () => {
  const { user } = useSelector((state) => state.user);
  const [isDaumPostOpen, setIsDaumPostOpen] = useState(false);
  const [businessNumber, setBusinessNumber] = useState("");
  const [representative, setRepresentative] = useState(
    (user?.business && user?.business[0].ownerName) || ""
  );
  const [openingDate, setOpeningDate] = useState("");
  const [businessAddress, setBusinessAddress] = useState(
    (user?.business && user?.business[0].businessLocation) || ""
  );
  const [businessName, setBusinessName] = useState(
    (user?.business && user?.business[0].businessName) || ""
  );
  const [confirmationIcon, setConfirmationIcon] = useState({ show: false });

  const businessNumberValid = businessNumber.length === 10;
  const representativeValid = representative.length > 0;
  const openingDateValid = openingDate.length > 0;
  const businessAddressValid = businessAddress.length > 0;
  const [businessNameValid, setBusinessNameValid] = useState(
    businessName.length > 0
  );
  const isFormValid =
    businessNumberValid &&
    representativeValid &&
    openingDateValid &&
    businessAddressValid &&
    businessNameValid;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const unShowIcon = () => {
    setTimeout(() => {
      setConfirmationIcon((cur) => {
        return { ...cur, show: false };
      });
    }, 1600);
  };

  const failureIconShow = (text) => {
    setConfirmationIcon({
      show: true,
      backgroundColor: "#FF6A6A;",
      color: "white",
      icon: faXmark,
      text,
    });

    unShowIcon();
  };

  const handleAuthClick = async () => {
    const bodyData = {
      businessName,
      businessLocation: businessAddress,
      b_no: businessNumber,
      start_dt: openingDate.replaceAll("-", ""),
      p_nm: representative,
    };

    try {
      const res = await Api.post(`users/${user.id}/seller`, bodyData);
      const updatedUser = res.data.payload;
      dispatch(update(updatedUser));
      navigate("/mypage");
    } catch (e) {
      if (e.response.data.error === "사업자 인증에 실패했습니다.") {
        failureIconShow("인증 실패");
      } else if (
        e.response.data.errorMessage ===
        "이미 존재하는 상호명입니다. 다른 상호명을 입력해주십시오."
      ) {
        failureIconShow("판매처 중복");
        setBusinessNameValid("again");
      }
    }
  };

  useEffect(() => {
    setBusinessNameValid(businessName.length > 0);
  }, [businessName]);

  return (
    <Container>
      <UserTopBar pageName={user?.business ? "판매처 수정" : "사업자 인증"} />

      <InputListContainter>
        <UserInput
          title="사업자 등록 번호"
          placeholder="사업자 등록 번호 10자리를 입력해주세요."
          type="number"
          value={businessNumber}
          setValue={setBusinessNumber}
          isValueValid={businessNumberValid}
        />

        <UserInput
          title="대표자 성명"
          type="text"
          value={representative}
          setValue={setRepresentative}
          isValueValid={representativeValid}
        />

        <UserInput
          title="개업일자"
          type="date"
          value={openingDate}
          setValue={setOpeningDate}
          isValueValid={openingDateValid}
        />

        <UserInput
          title="사업장 주소"
          type="text"
          value={businessAddress}
          setValue={setBusinessAddress}
          isValueValid={businessAddressValid}
          handleClick={() => {
            setIsDaumPostOpen(true);
          }}
        />

        <UserInput
          title="판매처 이름"
          type="text"
          placeholder="서비스 내에서 사용할 판매처 이름을 입력해주세요."
          value={businessName}
          setValue={setBusinessName}
          isValueValid={businessNameValid}
        />
      </InputListContainter>

      {isDaumPostOpen && (
        <DaumPost
          setAddress={setBusinessAddress}
          setIsDaumPostOpen={setIsDaumPostOpen}
        />
      )}

      <UserButton
        handleClick={handleAuthClick}
        valid={isFormValid}
        width={"long"}
      >
        {user?.business ? "판매처 수정하기" : "사업자 인증하기"}
      </UserButton>

      {confirmationIcon.show && <ConfirmationIcon style={confirmationIcon} />}
    </Container>
  );
};

export default BusinessAuthPage;

const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: 770px;
  min-width: 360px;
  min-height: 700px;
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
