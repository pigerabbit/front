import React from "react";
import styled, { keyframes } from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan } from "@fortawesome/free-solid-svg-icons";

const CouponSuccessPage = () => {
  return (
    <Container>
      <Result>
        <p>유효하지 않은 이용권입니다.</p>
        <p>유효한 이용권인지 확인해주세요.</p>
      </Result>
      <div id="round">
        <FontAwesomeIcon icon={faBan} />
      </div>
    </Container>
  );
};

export default CouponSuccessPage;

const popup = keyframes`
  0% {
    top:-30px;
  }
  20% {
    top:0px;
  }
  100% {
    top:0px;
  }
`;

const Container = styled.div`
  position: relative;
  width: 770px;
  min-width: 360px;
  min-height: 100vh;
  height: 100vh;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  #round {
    padding: 50px;
    background-color: #ba0000;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;

    > svg {
      width: 300px;
      height: 300px;
      color: #ffffff;
    }
  }

  animation: ${popup} 2s alternate;
`;

const Result = styled.div`
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
