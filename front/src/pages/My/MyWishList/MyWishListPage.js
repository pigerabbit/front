import { useState } from "react";
import styled from "styled-components";
import WishListTabs from "./WishListTabs";
import TabBar from "components/TabBar";

const MyWishListPage = () => {
  const [tab, setTab] = useState("group");
  return (
    <Container>
      <TabBar />
      <WishListTitle>
        <h2>찜</h2>
      </WishListTitle>
      <WishListTabs setTab={setTab} />
    </Container>
  );
};

export default MyWishListPage;

const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: 770px;
  min-width: 360px;
  min-height: 100vh;
  background-color: #f6f6f6;
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
