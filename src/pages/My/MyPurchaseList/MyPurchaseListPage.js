import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import MyPurchaseListTabs from "./MyPurchaseListTabs";
import ParticipatePurchaseListTab from "./ParticipatePurchaseListTab";
import CanceledListTab from "./CanceledListTab";
import OpenPurchaseListTab from "./OpenPurchaseListTab";
import * as Api from "api";
import MyPageLayout from "../MyPageLayout";
import LoadingSpinner from "components/LoadingSpinner";
import { useLocation } from "react-router-dom";

const MyPurchaseListPage = () => {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  let tabQuery = searchParams.get("tab");

  const [tab, setTab] = useState(tabQuery || "tab1");
  const [loading, setLoading] = useState(false);
  const [participatedGroups, setParticipatedGroups] = useState([]);
  const [openedGroups, setOpenedGroups] = useState([]);
  const [canceledData, setCancelData] = useState([]);

  const getGroupData = async () => {
    const getOpenedGroups = Api.get("groups/manager/true");
    const getParticipatedGroups = Api.get("groups/manager/false");
    try {
      setLoading(true);

      const [openedGroups, participatedGroups] = await Promise.all([
        getOpenedGroups,
        getParticipatedGroups,
      ]);

      const filteredOpenedGroups = openedGroups.data.payload.filter(
        (group) => !(group.state === -6 || group.state === -7)
      );
      const filteredParticipatedGroups = participatedGroups.data.payload.filter(
        (group) => !(group.state === -6 || group.state === -7)
      );

      const canceledOpenedGroups = openedGroups.data.payload.filter(
        (group) => group.state === -6 || group.state === -7
      );
      const canceledParticipatedGroups = participatedGroups.data.payload.filter(
        (group) => group.state === -6 || group.state === -7
      );

      setOpenedGroups(filteredOpenedGroups);
      setParticipatedGroups(filteredParticipatedGroups);
      setCancelData([...canceledOpenedGroups, ...canceledParticipatedGroups]);

      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getGroupData();
  }, []);

  return (
    <MyPageLayout pageName="공구 내역" previousPage={-1}>
      <Container loading={loading.toString()}>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            <MyPurchaseListTabs
              tab={tab}
              setTab={setTab}
              tabNames={["내가 참여한 공구", "내가 연 공구", "취소된 공구"]}
            />
            {tab === "tab1" && (
              <ParticipatePurchaseListTab
                participatedData={participatedGroups}
                userId={user?.id}
              />
            )}
            {tab === "tab2" && (
              <OpenPurchaseListTab
                openedData={openedGroups}
                userId={user?.id}
              />
            )}
            {tab === "tab3" && (
              <CanceledListTab
                canceledData={canceledData}
                setCanceledData={setCancelData}
                userId={user?.id}
              />
            )}
          </>
        )}
      </Container>
    </MyPageLayout>
  );
};

export default MyPurchaseListPage;

const Container = styled.div`
  position: relative;
  width: 100%;
  height: ${(props) => (props.loading ? "70%" : "100%")};
  max-width: 770px;
  min-width: 360px;
  background-color: #f6f6f6;
  padding-bottom: 220px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
