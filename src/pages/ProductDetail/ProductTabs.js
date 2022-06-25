import React from "react";
import styled from "styled-components";

const tabArr = [
  {
    name: "description",
    title: "상품설명",
  },
  {
    name: "information",
    title: "상세정보",
  },
  {
    name: "review",
    title: "후기",
  },
  {
    name: "inquiry",
    title: "문의",
  },
];

const ProductTabs = ({ currentTab, setCurrentTab }) => {
  const handleTab = (e) => {
    const clickedTab = tabArr.filter((v) => v.title === e.target.innerHTML)[0];
    setCurrentTab(clickedTab);
  };

  return (
    <>
      <TabsContainer>
        {tabArr.map((v, i) => (
          <Tab
            onClick={handleTab}
            name={v.name}
            curName={currentTab.name}
            key={i}
          >
            {v.title}
          </Tab>
        ))}
      </TabsContainer>
    </>
  );
};

export default ProductTabs;

const TabsContainer = styled.div`
  position: relative;
  margin: 2px auto;
  width: 95%;
  height: 50px;
  display: flex;
  border-bottom: solid #d0d0d0 1px;
`;

const Tab = styled.li`
  width: 25%;
  height: 100%;
  list-style: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  background-color: #ffffff;
  color: ${({ name, curName }) => (name === curName ? "#f79831" : "#636363")};
  border-bottom: ${({ name, curName }) =>
    name === curName ? "solid #f79831 3px;" : "none"};
  font-weight: bold;
  font-size: 15px;

  &:hover {
    border-bottom: solid #f79831 3px;
    color: #f79831;
  }
`;
