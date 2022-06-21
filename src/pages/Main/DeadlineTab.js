import React, { useState, useEffect } from "react";
import styled from "styled-components";
import * as Api from "api";

import CardContainer from "./CardsContainer";
import LoadingSpinner from "components/LoadingSpinner";

const DeadlineTab = () => {
  const [loading, setLoading] = useState(false);
  const [personGroupList, setPersonGroupList] = useState([]);
  const [timeGroupList, setTimeGroupList] = useState([]);
  const productDeadlineTitle = "달성 인원이 얼마 남지 않았어요!";
  const timeDeadlineTitle = "24시간 이내 마감되는 공동구매에요!";

  const getGroupsData = async () => {
    try {
      setLoading(true);

      const getPersonGroupList = Api.get("groups/sort/remainedPersonnel");
      const getTimeGroupList = Api.get("groups/sort/remainedTime");

      const [personRes, timeRes] = await Promise.all([
        getPersonGroupList,
        getTimeGroupList,
      ]);

      setPersonGroupList(personRes.data.payload);
      setTimeGroupList(timeRes.data.payload);

      setLoading(false);
    } catch (e) {
      // 에러처리
    }
  };

  useEffect(() => {
    getGroupsData();
  }, []);

  return (
    <Container>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <Contents>
          <CardContainer
            title={productDeadlineTitle}
            groupPurchaseList={personGroupList}
          ></CardContainer>

          <CardContainer
            title={timeDeadlineTitle}
            groupPurchaseList={timeGroupList}
          ></CardContainer>
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
