import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

import SliderCard from "./SliderCard";
import PaginationCardsContainer from "./PaginationCardsContainer";
import LoadingSpinner from "components/LoadingSpinner";

const HomeTab = ({
  loading,
  recommendationGroups,
  nearbyGroups,
  homeTabGroupsTitle,
}) => {
  const [page, setPage] = useState(1);
  const [cardPosition, setCardPosition] = useState(1);
  const [transition, setTransition] = useState(true);
  const lastPage = recommendationGroups.length;

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

  return (
    <Container>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <InterestGroups>
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
                {recommendationGroups.map((group) => (
                  <SliderCard group={group} key={group.groupId} />
                ))}
                {recommendationGroups.length > 0 && (
                  <SliderCard group={recommendationGroups[0]} />
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
          </InterestGroups>

          <PaginationCardsContainer
            title={homeTabGroupsTitle}
            groupPurchaseList={nearbyGroups}
          />
        </>
      )}
    </Container>
  );
};

export default HomeTab;

const Container = styled.div`
  min-height: 70%;
  margin-bottom: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const InterestGroups = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: 6vw 0 10vw 0;
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
