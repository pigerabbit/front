import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPersonNear, setTimeNear } from "redux/groupsSlice";
import styled from "styled-components";
import * as Api from "api";

import PaginationCardsContainer from "./PaginationCardsContainer";
import LoadingSpinner from "components/LoadingSpinner";

const DeadlineTab = () => {
  const { personNearGroups, timeNearGroups } = useSelector(
    (state) => state.groups
  );
  const [loading, setLoading] = useState(false);
  const productDeadlineTitle = "달성 인원이 얼마 남지 않았어요!";
  const timeDeadlineTitle = "24시간 이내 마감되는 공동구매에요!";

  const dispatch = useDispatch();

  const getGroupsData = async () => {
    try {
      setLoading(true);

      const getPersonNearGroups = Api.get("groups/sort/remainedPersonnel");
      const getTimeNearGroups = Api.get("groups/sort/remainedTime");

      const [personNearRes, timeNearRes] = await Promise.all([
        getPersonNearGroups,
        getTimeNearGroups,
      ]);

      dispatch(setPersonNear(personNearRes.data.payload));
      dispatch(setTimeNear(timeNearRes.data.payload));

      setLoading(false);
    } catch (e) {
      // 에러처리
    }
  };

  useEffect(() => {
    if (personNearGroups.length === 0 || timeNearGroups.legnth === 0)
      getGroupsData();
  }, []);

  return (
    <Container>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <Contents>
          <PaginationCardsContainer
            title={productDeadlineTitle}
            groupPurchaseList={personNearGroups}
          />

          <PaginationCardsContainer
            title={timeDeadlineTitle}
            groupPurchaseList={timeNearGroups}
          />
        </Contents>
      )}
    </Container>
  );
};

export default DeadlineTab;

const Container = styled.div`
  position: relative;
  padding-bottom: 100px;
  min-height: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Contents = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
