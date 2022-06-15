import React from "react";
import styled from "styled-components";

import TabBar from "components/TabBar";

const ExamplePage = () => {
  return (
    <Container>
      {/* 탭바 안쓰이는 페이지에서는 지워주시면 됩니다. */}
      <TabBar />
    </Container>
  );
};

export default ExamplePage;

const Container = styled.div`
  position: relative;
  width: 770px;
  min-width: 360px;
  min-height: 100vh;
  height: 200vh;
  background-color: #ffffff;
  "::-webkit-scrollbar-track" {
    background: none;
  },
`;
