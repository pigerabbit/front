import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRotateLeft } from "@fortawesome/free-solid-svg-icons";

import GroupPurchaseCard from "./GroupPurchaseCard";

const PaginationCardsContainer = ({ title, groupPurchaseList }) => {
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(4);
  const [page, setPage] = useState(1);
  const last = groupPurchaseList.length;
  const totalPage = Math.ceil(last / 4);
  const emptyNum = 4 - (last % 4);
  const showEmptyCard = page === totalPage && emptyNum !== 4;

  const handleButtonClick = () => {
    if (page === totalPage) {
      setFrom(0);
      setTo(4);
      setPage(1);
    } else {
      setFrom((cur) => cur + 4);
      setTo((cur) => cur + 4);
      setPage((cur) => cur + 1);
    }
  };

  return (
    <Container>
      <Title>{title}</Title>

      <CardsContainer>
        {groupPurchaseList?.slice(from, to).map((group, idx) => (
          <GroupPurchaseCard key={group.groupId} group={group} />
        ))}

        {emptyNum > 0 && showEmptyCard && <EmptyCard />}
        {emptyNum > 1 && showEmptyCard && <EmptyCard />}
        {emptyNum > 2 && showEmptyCard && <EmptyCard />}
      </CardsContainer>

      <NextButton onClick={handleButtonClick}>
        <span>
          다른 공동구매 추천 {page} / {totalPage}
        </span>
        <FontAwesomeIcon icon={faArrowRotateLeft} size="1x" />
      </NextButton>
    </Container>
  );
};

export default PaginationCardsContainer;

const Container = styled.div`
  margin-top: 30px;
  margin-bottom: 50px;
  position: relative;
  width: 80%;
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  font-size: 17px;
  font-weight: 600;
`;

const CardsContainer = styled.div`
  margin-top: 20px;
  width: 100%;

  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 20px;
`;

const EmptyCard = styled.div`
  width: 100%;
  height: 100px;
  background-color: #f7f7f7;
  border-radius: 5px;
`;

const NextButton = styled.div`
  cursor: pointer;
  border: solid 1px #d3d3d3;
  border-radius: 5px;
  width: 100%;
  height: 35px;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: #747474;

  > svg {
    margin-left: 8px;
    margin-top: -2px;
  }
`;
