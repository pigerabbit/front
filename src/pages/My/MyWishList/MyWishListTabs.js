import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const MyWishListTabs = ({ tab, setTab, tabNames }) => {
  const navigate = useNavigate();

  const handleClick = (tab) => () => {
    setTab(tab);
    navigate(`/wishlist?tab=${tab}`, { replace: true });
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
    </TabsContainer>
  );
};

export default MyWishListTabs;

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
  width: 48%;
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
