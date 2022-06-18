import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRotateLeft } from "@fortawesome/free-solid-svg-icons";

import GroupPurchaseCard from "./GroupPurchaseCard";

const CardsContainer = ({ title, groupPurchaseList }) => {
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(4);
  const [page, setPage] = useState(1);
  const last = groupPurchaseList?.length;
  const totalPage = last / 4;

  const handleButtonClick = () => {
    if (to === last) {
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

      <CardList>
        {groupPurchaseList?.slice(from, to).map((purchase, idx) => (
          <CardContainer key={purchase.groupId}>
            <GroupPurchaseCard purchase={purchase} />
            {idx < 3 && <div className="line" />}
          </CardContainer>
        ))}
      </CardList>

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
  margin-top: 30px;
  margin-bottom: 50px;
  position: relative;
  width: 80%;
  left: 10%;
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  font-size: 17px;
  font-weight: 600;
`;

const CardList = styled.div`
  margin-top: 20px;
  width: 100%;
`;

const CardContainer = styled.div`
  width: 100%;
  display: inline-block;
  @media (min-width: 700px) {
    width: 45%;
    margin-left: 2.5%;
  }
  margin-top: 15px;

  .line {
    width: 100%;
    height: 1px;
    background-color: #cdcdcd;
    margin-top: 15px;
    @media (min-width: 700px) {
      width: 44%;
      background-color: white;
    }
  }
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
