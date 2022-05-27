import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

import CardContainer from "./CardsContainer";

const DeadlineTab = () => {
  const [groupPurchaseList, setGroupPurchaseList] = useState([]);
  const productDeadlineTitle = "달성 인원이 얼마 남지 않았어요!";
  const timeDeadlineTitle = "3일 이내 마감되는 공동구매에요!";

  const getGroupPurchaseData = async () => {
    const data = await axios("/data/groupList.json", { method: "GET" });
    setGroupPurchaseList(data.data.groupList);
  };

  useEffect(() => {
    getGroupPurchaseData();
  }, []);

  return (
    <Container>
      <CardContainer
        title={productDeadlineTitle}
        groupPurchaseList={groupPurchaseList}
      ></CardContainer>
    </Container>
  );
};

export default DeadlineTab;

const Container = styled.div`
  border: red 1px solid;
`;
