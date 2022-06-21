import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";

import CouponSuccessPage from "./CouponSuccessPage";
import CouponFailPage from "./CouponFailPage";

const CheckResultPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isSuccess = location.state.success;

  return (
    <Container>
      {isSuccess ? <CouponSuccessPage /> : <CouponFailPage />}
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
