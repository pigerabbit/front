import React from "react";
import styled from "styled-components";
import DaumPostCode from "react-daum-postcode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const DaumPost = ({ setAddress, setIsDaumPostOpen }) => {
  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";
    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    setAddress(fullAddress);
    setIsDaumPostOpen(false);
  };
  return (
    <Container>
      <DaumPostCodeContainer>
        <FontAwesomeIcon
          icon={faXmark}
          onClick={() => {
            setIsDaumPostOpen(false);
          }}
        />
        <DaumPostCode
          onComplete={handleComplete}
          className="post-code"
          style={{ width: "100%", height: "100%" }}
        />
      </DaumPostCodeContainer>
    </Container>
  );
};
export default DaumPost;

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 12;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.4);
`;

const DaumPostCodeContainer = styled.div`
  position: relative;
  width: 75%;
  max-width: 450px;
  height: 450px;
  font-size: 12px;
  > svg {
    cursor: pointer;
    font-size: 25px;
    position: absolute;
    top: -6%;
    right: 1%;
    color: white;
  }
`;
