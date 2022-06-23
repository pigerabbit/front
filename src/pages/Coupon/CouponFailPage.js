import React from "react";
import styled, { keyframes } from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan } from "@fortawesome/free-solid-svg-icons";

const CouponSuccessPage = () => {
  return (
    <Container>
      <Result>
        <p>이용권 사용에 실패하였습니다.</p>
        <p>이용권을 다시 확인해주시기 바랍니다.</p>
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
    width: 350px;
    height: 350px;
    background-color: #ba0000;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;

    > svg {
      width: 250px;
      height: 250px;
      color: #ffffff;
    }

    @media (max-width: 400px) {
      width: 300px;
      height: 300px;
      > svg {
        width: 200px;
        height: 200px;
      }
    }
  }

  animation: ${popup} 2s alternate;
`;

const Result = styled.div`
  width: 90%;
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: 400px) {
    font-size: 25px;
  }
`;
