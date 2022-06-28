import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import * as Api from "api";

import TopBar from "./TopBar";
import Tabs from "./Tabs";
import HomeTab from "./HomeTab";
import BestTab from "./BestTab";
import DeadlineTab from "./DeadlineTab";
import SideBar from "../../components/SideBar";
import Category from "../../components/Category";
import TabBar from "components/TabBar";

const tabs = [
  { query: "home", title: "HOME" },
  { query: "best", title: "BEST" },
  { query: "deadline", title: "마감임박" },
];

const MainPage = () => {
  const [loading, setLoading] = useState(false);
  const [recommendationGroups, setRecommendationGroups] = useState([]);
  const [nearbyGroups, setNearbyGroups] = useState([]);
  const [bestProducts, setBestProducts] = useState([]);
  const [personNearGroups, setPersonNearGroups] = useState([]);
  const [timeNearGroups, setTimeNearGroups] = useState([]);
  const [homeTabGroupsTitle, setHomeTabGroupsTitle] = useState("");
  const [isOpenSideBar, setIsOpenSideBar] = useState(false);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const tabQuery = searchParams.get("tab");
  const [tab] = tabs.filter((tab) => tab.query === tabQuery);
  const [currentTab, setCurrentTab] = useState(!tab ? tabs[0] : tab);

  const navigate = useNavigate();

  const fetchData = async () => {
    const getRecommendationGroups = Api.get("recommendations/group");
    const getNearbyGroups = Api.get("groups/sort/locations");
    const getbestProducts = Api.get("products/main/top");
    const getPersonNearGroups = Api.get("groups/sort/remainedPersonnel");
    const getTimeNearGroups = Api.get("groups/sort/remainedTime");

    try {
      setLoading(true);

      const [
        recommendationGroupsRes,
        nearbyGroupsRes,
        bestProductsRes,
        personNearRes,
        timeNearRes,
      ] = await Promise.all([
        getRecommendationGroups,
        getNearbyGroups,
        getbestProducts,
        getPersonNearGroups,
        getTimeNearGroups,
      ]);

      setRecommendationGroups(recommendationGroupsRes.data.payload);
      setNearbyGroups(nearbyGroupsRes.data.payload);
      setBestProducts(bestProductsRes.data.payload);
      setPersonNearGroups(personNearRes.data.payload);
      setTimeNearGroups(timeNearRes.data.payload);

      if (nearbyGroupsRes.data.data) {
        setHomeTabGroupsTitle("근처에 있는 공동구매에요!");
      } else {
        setHomeTabGroupsTitle("추천드리는 택배공구에요!");
      }

      setLoading(false);
    } catch (e) {
      // 에러처리
    }
  };

  useEffect(() => {
    navigate(`?tab=${currentTab.query}`);
  }, [currentTab]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container>
      <TopBar setIsOpenSideBar={setIsOpenSideBar} />

      <Tabs currentTab={currentTab} setCurrentTab={setCurrentTab} />

      {tab?.query === "home" && (
        <HomeTab
          loading={loading}
          recommendationGroups={recommendationGroups}
          nearbyGroups={nearbyGroups}
          homeTabGroupsTitle={homeTabGroupsTitle}
        />
      )}
      {tab?.query === "best" && (
        <BestTab loading={loading} bestProducts={bestProducts} />
      )}
      {tab?.query === "deadline" && (
        <DeadlineTab
          loading={loading}
          personNearGroups={personNearGroups}
          timeNearGroups={timeNearGroups}
        />
      )}

      {isOpenSideBar && (
        <SideBar title="카테고리" setIsOpenSideBar={setIsOpenSideBar}>
          <Category />
        </SideBar>
      )}

      <TabBar />
    </Container>
  );
};

export default MainPage;

const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: 770px;
  min-width: 360px;
  min-height: 100vh;
  background-color: #ffffff;
  overflow: hidden;
`;
