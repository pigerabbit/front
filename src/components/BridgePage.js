import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import * as Api from "api";

const BridgePage = ({}) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const groupObjId = searchParams.get("group");
  const userId = searchParams.get("user");

  const getPaymentDetail = async () => {
    try {
      const res = await Api.get(`payments/${groupObjId}/${userId}`);
      console.log(res.data);
    } catch (e) {
      console.log("payment 정보 get 실패");
    }
  };

  useEffect(() => {
    getPaymentDetail();
  }, []);
  return (
    <Container>
      <div />
    </Container>
  );
};

export default BridgePage;

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
