import { useState, useEffect } from "react";
import styled from "styled-components";

import MyPageLayout from "../MyPageLayout";
import MyWishListTabs from "../MyWishListTabs";
import GroupWishListTab from "./GroupWishListTab";
import ProductWishListTab from "./ProductWishListTab";
import LoadingSpinner from "components/LoadingSpinner";
import * as Api from "api";

const MyWishListPage = () => {
  const [tab, setTab] = useState("tab1");
  const [groups, setGroups] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // const fetchWishGroups = async () => {
  //   const res = await Api.get("toggle/groups");
  //   setGroups(res.data);
  // };

  // const fetchWishProducts = async () => {
  //   const res = await Api.get("toggle/products");
  //   setProducts(res.data);
  // };

  const getWishItems = async () => {
    const getWishGroups = Api.get("toggle/groups");
    const getWishProducts = Api.get("toggle/products");

    try {
      setLoading(true);
      const [wishGroups, wishProducts] = await Promise.all([
        getWishGroups,
        getWishProducts,
      ]);
      setGroups(wishGroups.data);
      setProducts(wishProducts.data);

      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getWishItems();
  }, []);

  return (
    <MyPageLayout pageName="찜" previousPage={-1}>
      <Container loading={loading}>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            <MyWishListTabs
              tab={tab}
              setTab={setTab}
              tabNames={["공동구매", "판매상품"]}
            />
            {tab === "tab1" && <GroupWishListTab groups={groups} />}
            {tab === "tab2" && <ProductWishListTab products={products} />}
          </>
        )}
      </Container>
    </MyPageLayout>
  );
};

export default MyWishListPage;

const Container = styled.div`
  position: relative;
  width: 100%;
  height: ${(props) => (props.loading ? "70%" : "100%")};
  max-width: 770px;
  min-width: 360px;
  background-color: #f6f6f6;
  padding-bottom: 220px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
