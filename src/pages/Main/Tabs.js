import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

import useUpdateEffect from "hooks/useUpdateEffect";

const tabs = [
  { query: "home", title: "HOME" },
  { query: "best", title: "BEST" },
  { query: "deadline", title: "마감임박" },
];

const Tabs = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const tabQuery = searchParams.get("tab");
  const [tab] = tabs.filter((tab) => tab.query === tabQuery);
  const [currentTab, setCurrentTab] = useState(!tabQuery ? tabs[0] : tab);

  const handleTabClick = (tab) => {
    return () => {
      setCurrentTab(tab);
    };
  };

  useUpdateEffect(() => {
    navigate(`?tab=${currentTab.query}`);
  }, [currentTab]);

  return (
    <TabsContainer>
      {tabs.map((tab) => (
        <Tab onClick={handleTabClick(tab)} key={tab.query}>
          <span>{tab.title}</span>
        </Tab>
      ))}
      <TabLine currentTab={currentTab.query} />
    </TabsContainer>
  );
};

export default Tabs;

const TabsContainer = styled.div`
  position: relative;
  margin-top: 5px;
  left: 5%;
  width: 90%;
  height: 50px;
  display: flex;
`;

const Tab = styled.div`
  cursor: pointer;
  width: 33.3%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
`;

const TabLine = styled.div`
  position: absolute;
  background-color: black;
  width: 33.3%;
  height: 1.5px;
  left: ${({ currentTab }) => {
    if (currentTab === "home") return "0;";
    else if (currentTab === "best") return "33.4%;";
    else if (currentTab === "deadline") return "66.7%;";
  }}
  bottom: 0;
  transition: left 0.4s;
`;
