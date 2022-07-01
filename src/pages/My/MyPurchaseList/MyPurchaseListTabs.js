import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const MyPurchaseListTabs = ({ tab, setTab, tabNames }) => {
  const navigate = useNavigate();

  const handleClick = (tab) => () => {
    setTab(tab);
    navigate(`/purchaselist?tab=${tab}`, { replace: true });
  };

  return (
    <TabsContainer>
      <Tab
        onClick={handleClick("tab1")}
        borderBottom={tab === "tab1" ? "2px solid #ffb564" : "none"}
      >
        <span>{tabNames[0]}</span>
      </Tab>
      <Tab
        onClick={handleClick("tab2")}
        borderBottom={tab === "tab2" ? "2px solid #ffb564" : "none"}
      >
        <span>{tabNames[1]}</span>
      </Tab>
      <Tab
        onClick={handleClick("tab3")}
        borderBottom={tab === "tab3" ? "2px solid #ffb564" : "none"}
      >
        <span>{tabNames[2]}</span>
      </Tab>
    </TabsContainer>
  );
};

export default MyPurchaseListTabs;

const TabsContainer = styled.div`
  position: absolute;
  top: 10px;
  z-index: 10;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
`;

const Tab = styled.div`
  cursor: pointer;
  width: 32%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-bottom: ${(props) => props.borderBottom};
  span {
    pointer-events: none;
  }
`;
