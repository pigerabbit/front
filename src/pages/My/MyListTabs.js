import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";

const MyListTabs = ({ tab, setTab, tabNames, isWishList }) => {
  const navigate = useNavigate();

  const handleClick = (tab) => () => {
    setTab(tab);
    const route = isWishList ? "/wishlist" : "/purchaselist";
    navigate(`${route}?tab=${tab}`, { replace: true });
  };

  return (
    <TabsContainer
      isTab1={tab === "tab1"}
      isWishListTab1={isWishList && tab === "tab1"}
    >
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

export default MyListTabs;

const TabsContainer = styled.div`
  position: relative;
  margin-top: ${(props) => (props.isTab1 ? "36px" : "75px")};
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  ${(props) =>
    props.isWishListTab1 &&
    css`
      margin-top: 6px;
    `}
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
