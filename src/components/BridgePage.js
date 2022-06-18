import React, { useEffect, useState } from "react";
import styled from "styled-components";

const BridgePage = ({}) => {
  useEffect(() => {}, []);
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
