import React, { useState } from "react";
import styled from "styled-components";

import TopBar from "./TopBar";
import Tabs from "./Tabs";
import HomeTab from "./HomeTab";
import BestTab from "./BestTab";
import DeadlineTab from "./DeadlineTab";
import SideBar from "../../components/SideBar";
import Category from "../../components/Category";
import Notice from "./Notice";
import TabBar from "components/TabBar";
import { useLocation } from "react-router-dom";

const tabs = {
  home: <HomeTab />,
  best: <BestTab />,
  deadline: <DeadlineTab />,
};

const MainPage = () => {
  const [sideBarTitle, setSideBarTitle] = useState("카테고리");
  const [isOpenSideBar, setIsOpenSideBar] = useState(false);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  let tab = searchParams.get("tab");
  if (!tab) tab = "home";

  return (
    <Container>
      <TopBar
        setSideBarTitle={setSideBarTitle}
        setIsOpenSideBar={setIsOpenSideBar}
      />

      <Tabs />
      {tabs[tab]}

      {isOpenSideBar && (
        <SideBar title={sideBarTitle} setIsOpenSideBar={setIsOpenSideBar}>
          {sideBarTitle === "카테고리" && <Category />}
          {sideBarTitle === "알림" && <Notice />}
        </SideBar>
      )}

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
