import React, { useState } from "react";
import styled from "styled-components";

import TopBar from "./TopBar";
import SideBar from "./SideBar";
import TabBar from "components/TabBar";

const MainPage = () => {
  const [sideBarTitle, setSideBarTitle] = useState("카테고리");
  const [isOpenSideBar, setIsOpenSideBar] = useState(false);

  return (
    <Container>
      <TopBar
        setSideBarTitle={setSideBarTitle}
        setIsOpenSideBar={setIsOpenSideBar}
      />
      <SideBar
        title={sideBarTitle}
        isOpenSideBar={isOpenSideBar}
        setIsOpenSideBar={setIsOpenSideBar}
      />
      <TabBar />
    </Container>
  );
};

export default MainPage;

const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: 770px;
  min-width: 360px;
  min-height: 100vh;
  background-color: #ffffff;
  overflow: hidden;
`;
