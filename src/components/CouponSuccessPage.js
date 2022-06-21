import React from "react";
import styled, { keyframes } from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const CouponSuccessPage = () => {
  return (
    <Container>
      <Result>이용권 사용이 확인되었습니다.</Result>
      <div id="round">
        <FontAwesomeIcon icon={faCheck} />
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
    background-color: #ffb564;
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
`;
