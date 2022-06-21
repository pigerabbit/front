import { useState, useEffect } from "react";
import styled from "styled-components";

import MyPageLayout from "../MyPageLayout";
import MyWishListTabs from "../MyWishListTabs";
import GroupWishListTab from "./GroupWishListTab";
import ProductWishListTab from "./ProductWishListTab";
import * as Api from "api";

const MyWishListPage = () => {
  const [tab, setTab] = useState("tab1");
  const [groups, setGroups] = useState([]);
  const [products, setProducts] = useState([]);

  const fetchWishGroups = async () => {
    const res = await Api.get("toggle/groups");
    setGroups(res.data);
  };

  const fetchWishProducts = async () => {
    const res = await Api.get("toggle/products");
    setProducts(res.data);
  };

  useEffect(() => {
    fetchWishGroups();
    fetchWishProducts();
  }, []);

  return (
    <MyPageLayout pageName="찜" previousPage="/">
      <Container>
        <MyWishListTabs
          tab={tab}
          setTab={setTab}
          tabNames={["공동구매", "판매상품"]}
        />
        {tab === "tab1" && <GroupWishListTab groups={groups} />}
        {tab === "tab2" && <ProductWishListTab products={products} />}
      </Container>
    </MyPageLayout>
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
