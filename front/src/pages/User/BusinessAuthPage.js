import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import * as Api from "api";

import UserTopBar from "./UserTopBar";
import UserInput from "./UserInput";
import UserButton from "./UserButton";

const BusinessAuthPage = () => {
  const [businessNumber, setBusinessNumber] = useState("");
  const [representative, setRepresentative] = useState("");
  const [openingDate, setOpeningDate] = useState("");
  const [businessAddress, setBusinessAddress] = useState("");
  const [businessName, setBusinessName] = useState("");

  const businessNumberValid = businessNumber.length > 0;
  const representativeValid = representative.length > 0;
  const openingDateValid = openingDate.length > 0;
  const businessAddressValid = businessAddress.length > 0;
  const businessNameValid = businessName.length > 0;
  const isFormValid =
    businessNumberValid &&
    representativeValid &&
    openingDateValid &&
    businessAddressValid &&
    businessNameValid;

  const handleAuthClick = () => {};

  return (
    <Container>
      <UserTopBar pageName={"사업자 인증"} />

      <InputListContainter>
        <UserInput
          title="사업자 등록 번호"
          type="text"
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

      <UserButton
        handleClick={handleAuthClick}
        valid={isFormValid}
        width={"long"}
      >
        사업자 인증하기
      </UserButton>
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
