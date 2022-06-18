import React, { useState, useEffect } from "react";
import styled from "styled-components";
import * as Api from "api";

import CardContainer from "./CardsContainer";

const DeadlineTab = () => {
  const [personGroupList, setPersonGroupList] = useState([]);
  const [timeGroupList, setTimeGroupList] = useState([]);
  const productDeadlineTitle = "달성 인원이 얼마 남지 않았어요!";
  const timeDeadlineTitle = "24시간 이내 마감되는 공동구매에요!";

  const getGroupPurchaseData = async () => {
    try {
      const getPersonGroupList = Api.get("groups/sort/remainedPersonnel");
      const getTimeGroupList = Api.get("groups/sort/remainedTime");

      const [personRes, timeRes] = await Promise.all([
        getPersonGroupList,
        getTimeGroupList,
      ]);

      setPersonGroupList(personRes.data.payload);
      setTimeGroupList(timeRes.data.payload);
    } catch (e) {
      // 에러처리
    }
  };

  useEffect(() => {
    getGroupPurchaseData();
  }, []);

  return (
    <Container>
      <CardContainer
        title={productDeadlineTitle}
        groupPurchaseList={personGroupList}
      ></CardContainer>

      <CardContainer
        title={timeDeadlineTitle}
        groupPurchaseList={timeGroupList}
      ></CardContainer>
    </Container>
  );
};

export default DeadlineTab;

const Container = styled.div`
  padding-bottom: 100px;
`;
