import { useState, useEffect } from "react";
import styled from "styled-components";
import GroupHeader from "../GroupHeader";

const PaymentDetailPage = () => {
  return (
    <Container>
      <GroupHeader headerTitle={`주문/결제`} />
    </Container>
  );
};

export default PaymentDetailPage;

const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: 770px;
  min-width: 360px;
  height: 100%;
  overflow: hidden;
`;
