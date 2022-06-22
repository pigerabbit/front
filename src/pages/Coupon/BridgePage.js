import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import * as Api from "api";

import ConfirmationUsagePage from "./ConfirmationUsagePage";

const BridgePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const groupObjId = searchParams.get("group");
  const userId = searchParams.get("user");
  const quantity = searchParams.get("quantity");

  const [confirmation, setConfirmation] = useState(false);

  const getPaymentDetail = async () => {
    try {
      const res = await Api.get(`payments/${groupObjId}/${userId}`);
      if (res.data.success) {
        try {
          const payment = res.data.payload;
          const paymentId = res.data.payload.paymentId;
          const resUse = await Api.put(`payments/${paymentId}`, { used: true });
          if (resUse.data.success) {
            navigate("/check/result", {
              state: { success: true, payment, quantity },
            });
          }
        } catch (e) {
          navigate("/check/result", { state: { success: false } });
        }
      }
    } catch (e) {
      console.log("payment 정보 get 실패");
    }
  };

  useEffect(() => {
    if (confirmation === true) getPaymentDetail();
  }, [confirmation]);

  return (
    <Container>
      {!confirmation && (
        <ConfirmationUsagePage setConfirmation={setConfirmation} />
      )}
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
