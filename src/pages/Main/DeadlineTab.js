import React from "react";
import styled from "styled-components";

import PaginationCardsContainer from "./PaginationCardsContainer";
import LoadingSpinner from "components/LoadingSpinner";

const DeadlineTab = ({ loading, personNearGroups, timeNearGroups }) => {
  const productDeadlineTitle = "공구 달성이 얼마 남지 않았어요!";
  const timeDeadlineTitle = "24시간 이내 마감되는 공동구매에요!";

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
