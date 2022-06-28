import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

import CouponSucceededPage from "./CouponSucceededPage";
import CouponFailedPage from "./CouponFailedPage";

const CheckResultPage = () => {
  const location = useLocation();
  const isSuccess = location.state.success;
  const group = location.state.group;
  const quantity = location.state.quantity;

  return (
    <Container>
      {isSuccess ? (
        <CouponSucceededPage group={group} quantity={quantity} />
      ) : (
        <CouponFailedPage />
      )}
    </Container>
  );
};

export default CheckResultPage;

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

  > div {
  }
`;
