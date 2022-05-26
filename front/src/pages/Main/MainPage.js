import React from "react";
import styled from "styled-components";

import TabBar from "components/TabBar";

const MainPage = () => {
  return (
    <Container>
      <TabBar />
    </Container>
  );
};

export default MainPage;

const Container = styled.div`
  position: relative;
  width: 770px;
  min-width: 360px;
  min-height: 100vh;
  height: 200vh;
  background-color: #ffffff;
`;
