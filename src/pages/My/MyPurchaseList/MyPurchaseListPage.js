import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import MyWishListTabs from "../MyWishListTabs";
import ParticipatePurchaseListTab from "./ParticipatePurchaseListTab";
import OpenPurchaseListTab from "./OpenPurchaseListTab";
import * as Api from "api";
import MyPageLayout from "../MyPageLayout";
import LoadingSpinner from "components/LoadingSpinner";

const MyPurchaseListPage = () => {
  const { user } = useSelector((state) => state.user);

  const [tab, setTab] = useState("tab1");
  const [loading, setLoading] = useState(false);
  const [participatedGroups, setParticipatedGroups] = useState([]);
  const [openedGroups, setOpenedGroups] = useState([]);

  const getGroupData = async () => {
    const getOpenedGroups = Api.get("groups/manager/true");
    const getParticipatedGroups = Api.get("groups/manager/false");
    try {
      setLoading(true);

      const [openedGroups, participatedGroups] = await Promise.all([
        getOpenedGroups,
        getParticipatedGroups,
      ]);

      setParticipatedGroups(participatedGroups.data.payload);
      setOpenedGroups(openedGroups.data.payload);

      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getGroupData();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <MyPageLayout pageName="공구 내역" previousPage="/">
      <Container>
        <MyWishListTabs
          tab={tab}
          setTab={setTab}
          tabNames={["내가 참여한 공구", "내가 연 공구"]}
        />
        {tab === "tab1" && (
          <ParticipatePurchaseListTab
            participatedData={participatedGroups}
            userId={user?.id}
          />
        )}
        {tab === "tab2" && (
          <OpenPurchaseListTab openedData={openedGroups} userId={user?.id} />
        )}
      </Container>
    </MyPageLayout>
  );
};

export default MyPurchaseListPage;

const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: 770px;
  min-width: 360px;
  background-color: #f6f6f6;
  padding-bottom: 220px;
`;

const WishListTitle = styled.div`
  width: 100%;
  height: 75px;
  background-color: #fff;
  h2 {
    text-align: center;
    line-height: 75px;
    color: #939393;
  }
`;
