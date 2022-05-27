import styled from "styled-components";

const WishListTabs = ({ setTab }) => {
  const borderBottomStyle = "2px solid #FFB564";

  return (
    <TabsContainer>
      <Tab onClick={() => setTab("group")}>
        <span>공동구매</span>
      </Tab>
      <Tab onClick={() => setTab("product")}>
        <span>판매상품</span>
      </Tab>
    </TabsContainer>
  );
};

export default WishListTabs;

const TabsContainer = styled.div`
  position: relative;
  margin-top: 5px;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-evenly;
`;

const Tab = styled.div`
  cursor: pointer;
  width: 48%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  span {
    pointer-events: none;
  }
`;
