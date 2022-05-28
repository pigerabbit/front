import styled from "styled-components";

const WishListTabs = ({ tab, setTab }) => {
  return (
    <TabsContainer>
      <Tab
        onClick={() => setTab("group")}
        borderBottom={tab === "group" ? "2px solid #ffb564" : "none"}
      >
        <span>공동구매</span>
      </Tab>
      <Tab
        onClick={() => setTab("product")}
        borderBottom={tab === "product" ? "2px solid #ffb564" : "none"}
      >
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
  border-bottom: ${(props) => props.borderBottom};
  span {
    pointer-events: none;
  }
`;
