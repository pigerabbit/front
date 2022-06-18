import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import * as Api from "api";

import SliderCard from "./SliderCard";
import CardsContainer from "./CardsContainer";

const HomeTab = () => {
  const [recommendationGroups, setRecommendationGroups] = useState([]);
  const [nearbyGroups, setNearbyGroups] = useState([]);
  const [page, setPage] = useState(1);
  const [cardPosition, setCardPosition] = useState(1);
  const [transition, setTransition] = useState(true);
  const lastPage = recommendationGroups.length;
  const nearbyTitle = "근처에 있는 공동구매에요!";

  const handleChevronClick = (leftClick) => {
    return () => {
      setTransition(true);
      setCardPosition((cur) => (leftClick ? cur - 1 : cur + 1));

      if (page === (leftClick ? 1 : lastPage)) {
        setPage(leftClick ? lastPage : 1);
        setTimeout(() => {
          setTransition(false);
          setCardPosition(leftClick ? lastPage : 1);
        }, [400]);
      } else {
        setPage((cur) => (leftClick ? cur - 1 : cur + 1));
      }
    };
  };

  const getGroupsData = async () => {
    const getRecommendationGroups = Api.get("recommendations/group");
    const getNearbyGroups = Api.get("groups/sort/locations");

    try {
      const [recommendationGroups, nearbyGroups] = await Promise.all([
        getRecommendationGroups,
        getNearbyGroups,
      ]);

      setRecommendationGroups(recommendationGroups.data.payload);
      setNearbyGroups(nearbyGroups.data.payload);
    } catch (e) {
      // 에러처리
    }
  };

  useEffect(() => {
    getGroupsData();
  }, []);

  return (
    <Container>
      <Interest>
        <Title>
          <span>관심 있으실만한</span>
          <span>공동구매 추천해드려요</span>
        </Title>

        <SliderContainer>
          <CardList
            length={recommendationGroups.length + 2}
            left={cardPosition}
            transition={transition}
          >
            {recommendationGroups.length > 0 && (
              <SliderCard purchase={recommendationGroups[lastPage - 1]} />
            )}
            {recommendationGroups.map((purchase) => (
              <SliderCard purchase={purchase} key={purchase.groupId} />
            ))}
            {recommendationGroups.length > 0 && (
              <SliderCard purchase={recommendationGroups[0]} />
            )}
          </CardList>
        </SliderContainer>

        <Pagination>
          <FontAwesomeIcon
            icon={faChevronLeft}
            onClick={handleChevronClick(true)}
          />
          <div>
            <span>{page}</span> / {lastPage}
          </div>
          <FontAwesomeIcon
            icon={faChevronRight}
            onClick={handleChevronClick(false)}
          />
        </Pagination>
      </Interest>

      <CardsContainer title={nearbyTitle} groupPurchaseList={nearbyGroups} />
    </Container>
  );
};

export default HomeTab;

const Container = styled.div`
  margin-bottom: 150px;
`;

const Interest = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: 6vw 10% 10vw 10%;
  @media (min-width: 770px) {
    margin: 45px 10% 75px 10%;
  }
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 17px;
  @media (min-width: 500px) {
    font-size: 19px;
  }
  font-weight: 600;
  margin-bottom: 15px;

  > span + span {
    margin-top: 5px;
  }
`;

const SliderContainer = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
`;

const CardList = styled.div`
  position: relative;
  left: ${({ left }) => -left * 100 + "%;"}
  display: flex;
  width: calc(100% * ${({ length }) => length});
  transition: ${({ transition }) => (transition ? "left 0.4s;" : ";")}
`;

const Pagination = styled.div`
  width: 100%;
  margin-top: 4.5vw;
  @media (min-width: 770px) {
    margin-top: 32px;
  }
  display: flex;
  justify-content: center;
  color: #a4a4a4;
  font-size: 4vw;
  @media (min-width: 500px) {
    font-size: 20px;
  }

  > div {
    display: flex;
    justify-content: center;
    width: 12vw;
    margin: 0 2vw;
    @media (min-width: 500px) {
      width: 60px;
      margin: 2px 14px;
    }
    margin-top: 0.4vw;

    > span {
      color: black;
      margin-right: 3px;
      @media (min-width: 500px) {
        margin-right: 5px;
      }
    }
  }

  > svg {
    cursor: pointer;
  }
`;
