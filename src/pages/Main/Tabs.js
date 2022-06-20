import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

const tabs = [
  { tab: "home", title: "HOME" },
  { tab: "best", title: "BEST" },
  { tab: "deadline", title: "마감임박" },
];

const Tabs = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const tab = searchParams.get("tab");
  const [currentTab, setCurrentTab] = useState(tab === "" ? "home" : tab);

  const handleTabClick = (tab) => {
    return () => {
      setCurrentTab(tab);
    };
  };

  useEffect(() => {
    navigate(`?tab=${currentTab}`);
  }, [currentTab]);

  return (
    <TabsContainer>
      {tabs.map(({ tab, title }) => (
        <Tab onClick={handleTabClick(tab)} key={tab}>
          <span>{title}</span>
        </Tab>
      ))}
      <TabLine currentTab={currentTab} />
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
