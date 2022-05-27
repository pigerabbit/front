import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRotateLeft } from "@fortawesome/free-solid-svg-icons";

import GroupPurchaseCard from "./GroupPurchaseCard";

const CardsContainer = ({ title, groupPurchaseList }) => {
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(3);
  const [page, setPage] = useState(1);
  const last = groupPurchaseList.length;
  const totalPage = last / 3;

  const CardStyles = {
    cardHeight: 85,
    titleSize: 14,
    priceSize: 12,
    deadlineSize: 12,
  };

  const handleButtonClick = () => {
    if (to === last) {
      setFrom(0);
      setTo(3);
      setPage(1);
    } else {
      setFrom((cur) => cur + 3);
      setTo((cur) => cur + 3);
      setPage((cur) => cur + 1);
    }
  };

  return (
    <Container>
      <Title>{title}</Title>

      {groupPurchaseList.slice(from, to).map((purchase, idx) => (
        <>
          <CardContainer key={purchase.groupId}>
            <GroupPurchaseCard styles={CardStyles} purchase={purchase} />
          </CardContainer>
          {idx < 2 && <div className="line" />}
        </>
      ))}

      <NextButton onClick={handleButtonClick}>
        <span>
          다른 공동구매 추천 {page} / {totalPage}
        </span>
        <FontAwesomeIcon icon={faArrowRotateLeft} size="1x" />
      </NextButton>
    </Container>
  );
};

export default CardsContainer;

const Container = styled.div`
  border: blue solid 1px;
  margin-top: 20px;
  margin-bottom: 20px;
  position: relative;
  width: 80%;
  left: 10%;

  .line {
    width: 100%;
    height: 1px;
    background-color: #cdcdcd;
  }
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: 600;
`;

const CardContainer = styled.div`
  width: 100%;
  margin: 15px 0;
`;

const NextButton = styled.div`
  cursor: pointer;
  border: solid 1px #d3d3d3;
  border-radius: 5px;
  width: 100%;
  height: 35px;
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
