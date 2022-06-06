import { useState, useEffect } from "react";
import styled from "styled-components";
import TabBar from "components/TabBar";
import MyWishListTabs from "../MyWishListTabs";
import GroupWishListTab from "./GroupWishListTab";
import ProductWishListTab from "./ProductWishListTab";
import * as Api from "api";

const MyWishListPage = () => {
  const [tab, setTab] = useState("tab1");

  // const fetchWishGroups = async () => {
  //   const res = await Api.get("toggle/groups");
  //   console.log(res.data);
  // };

  // const fetchWishProducts = async () => {
  //   const res = await Api.get("toggle/products");
  //   console.log(res.data);
  // };

  // useEffect(() => {
  //   fetchWishGroups();
  //   fetchWishProducts();
  // });

  return (
    <Container>
      <WishListTitle>
        <h2>찜</h2>
      </WishListTitle>
      <MyWishListTabs
        tab={tab}
        setTab={setTab}
        tabNames={["공동구매", "판매상품"]}
      />
      {tab === "tab1" && <GroupWishListTab />}
      {tab === "tab2" && <ProductWishListTab />}
      <TabBar />
    </Container>
  );
};

export default MyWishListPage;

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
