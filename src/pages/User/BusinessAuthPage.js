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
import useShowComfirmationIcon from "hooks/useShowConfirmationIcon";

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

  const businessNumberValid = businessNumber.length === 10;
  const representativeValid = representative?.length > 0;
  const openingDateValid = openingDate.length > 0;
  const businessAddressValid = businessAddress?.length > 0;
  const [businessNameValid, setBusinessNameValid] = useState(
    businessName?.length > 0
  );
  const isFormValid =
    businessNumberValid &&
    representativeValid &&
    openingDateValid &&
    businessAddressValid &&
    businessNameValid;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const showComfirmationIcon = useShowComfirmationIcon();

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
      const updatedUserData = res.data.payload;
      dispatch(update(updatedUserData));
      navigate("/mypage");
    } catch (e) {
      if (e.response.data.error === "????????? ????????? ??????????????????.") {
        showComfirmationIcon({
          backgroundColor: "#FF6A6A;",
          color: "white",
          icon: faXmark,
          text: "?????? ??????",
        });
      } else if (
        e.response.data.errorMessage ===
        "?????? ???????????? ??????????????????. ?????? ???????????? ?????????????????????."
      ) {
        showComfirmationIcon({
          backgroundColor: "#FF6A6A;",
          color: "white",
          icon: faXmark,
          text: "????????? ??????",
        });
        setBusinessNameValid("again");
      }
    }
  };

  useEffect(() => {
    setBusinessNameValid(businessName.length > 0);
  }, [businessName]);

  useEffect(() => {
    if (user?.business) {
      setRepresentative(user.business[0].ownerName);
      setBusinessAddress(user.business[0].businessLocation);
      setBusinessName(user.business[0].businessName);
    }
  }, [user]);

  return (
    <Container>
      <UserTopBar pageName={user?.business ? "????????? ??????" : "????????? ??????"} />

      <InputListContainter>
        <UserInput
          title="????????? ?????? ??????"
          placeholder="????????? ?????? ?????? 10????????? ??????????????????."
          type="number"
          value={businessNumber}
          setValue={setBusinessNumber}
          isValueValid={businessNumberValid}
        />

        <UserInput
          title="????????? ??????"
          type="text"
          value={representative}
          setValue={setRepresentative}
          isValueValid={representativeValid}
        />

        <UserInput
          title="????????????"
          type="date"
          value={openingDate}
          setValue={setOpeningDate}
          isValueValid={openingDateValid}
        />

        <UserInput
          title="????????? ??????"
          type="text"
          value={businessAddress}
          isValueValid={businessAddressValid}
          handleClick={() => {
            setIsDaumPostOpen(true);
          }}
        />

        <UserInput
          title="????????? ??????"
          type="text"
          placeholder="????????? ????????? ????????? ????????? ????????? ??????????????????."
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
        {user?.business ? "????????? ????????????" : "????????? ????????????"}
      </UserButton>

      <ConfirmationIcon />
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
`;

const InputListContainter = styled.form`
  width: 70%;
  max-width: 400px;
  margin-top: 10%;
  margin-bottom: 10%;
`;
