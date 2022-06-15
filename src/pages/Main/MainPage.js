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
import ConfirmationIcon from "components/ConfirmationIcon";

const MainPage = () => {
  const [tab, setTab] = useState("home");
  const [sideBarTitle, setSideBarTitle] = useState("카테고리");
  const [isOpenSideBar, setIsOpenSideBar] = useState(false);
  const [confirmationIcon, setConfirmationIcon] = useState({ show: false });

  return (
    <Container>
      <TopBar
        setSideBarTitle={setSideBarTitle}
        setIsOpenSideBar={setIsOpenSideBar}
      />

      {confirmationIcon.show && <ConfirmationIcon style={confirmationIcon} />}

      <Tabs tab={tab} setTab={setTab} />
      {tab === "home" && <HomeTab setConfirmationIcon={setConfirmationIcon} />}
      {tab === "best" && <BestTab setConfirmationIcon={setConfirmationIcon} />}
      {tab === "deadline" && (
        <DeadlineTab setConfirmationIcon={setConfirmationIcon} />
      )}

      <SideBar
        title={sideBarTitle}
        isOpenSideBar={isOpenSideBar}
        setIsOpenSideBar={setIsOpenSideBar}
      >
        {sideBarTitle === "카테고리" && <Category />}
        {sideBarTitle === "알림" && <Notice />}
      </SideBar>

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
