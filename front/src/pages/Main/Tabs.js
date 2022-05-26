import React from "react";
import styled from "styled-components";

const Tabs = ({ tab, setTab }) => {
  return (
    <TabsContainer>
      <Tab
        onClick={() => {
          setTab("home");
        }}
      >
        <span>HOME</span>
      </Tab>
      <Tab
        onClick={() => {
          setTab("best");
        }}
      >
        <span>BEST</span>
      </Tab>
      <Tab
        onClick={() => {
          setTab("deadline");
        }}
      >
        <span>마감임박</span>
      </Tab>
      <TabLine tab={tab} />
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
  height: 2px;
  left: ${({ tab }) => {
    if (tab === "home") return "0;";
    else if (tab === "best") return "33.4%;";
    else if (tab === "deadline") return "66.7%;";
  }}
  bottom: 0;
  transition: left 0.4s;
`;
