import styled from "styled-components";

const MyWishListTabs = ({ tab, setTab, tabNames }) => {
  return (
    <TabsContainer>
      <Tab
        onClick={() => setTab("tab1")}
        borderBottom={tab === "tab1" ? "2px solid #ffb564" : "none"}
      >
        <span>{tabNames[0]}</span>
      </Tab>
      <Tab
        onClick={() => setTab("tab2")}
        borderBottom={tab === "tab2" ? "2px solid #ffb564" : "none"}
      >
        <span>{tabNames[1]}</span>
      </Tab>
    </TabsContainer>
  );
};

export default MyWishListTabs;

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
