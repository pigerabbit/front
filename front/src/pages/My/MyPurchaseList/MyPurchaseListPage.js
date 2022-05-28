import { useState } from "react";
import styled from "styled-components";
import TabBar from "components/TabBar";
import MyWishListTabs from "../MyWishListTabs";
import ParticipatePurchaseListTab from "./ParticipatePurchaseListTab";
import OpenPurchaseListTab from "./OpenPurchaseListTab";

const MyPurchaseListPage = () => {
  const [tab, setTab] = useState("tab1");
  return (
    <Container>
      <WishListTitle>
        <h2>공구내역</h2>
      </WishListTitle>
      <MyWishListTabs
        tab={tab}
        setTab={setTab}
        tabNames={["내가 참여한 공구", "내가 연 공구"]}
      />
      {tab === "tab1" && <ParticipatePurchaseListTab />}
      {tab === "tab2" && <OpenPurchaseListTab />}
      <TabBar />
    </Container>
  );
};

export default MyPurchaseListPage;

const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: 770px;
  min-width: 360px;
  background-color: #f6f6f6;
  padding-bottom: 220px;
`;
const WishListTitle = styled.div`
  width: 100%;
  height: 75px;
  background-color: #fff;
  h2 {
    text-align: center;
    line-height: 75px;
    color: #939393;
  }
`;
