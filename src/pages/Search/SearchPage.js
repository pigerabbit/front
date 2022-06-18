import { useState, useEffect, useRef } from "react";
import styled, { css } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import * as Api from "api";

import SearchCurrent from "./SearchCurrent";
import SearchInputForm from "./SearchInputForm";
import SearchTrending from "./SearchTrending";
import SearchGroupCard from "./SearchGroupCard";

const SearchPage = () => {
  const [isTrendingPage, setIsTrendingPage] = useState(true);
  const [deadlineGroup, setDeadlineGroup] = useState(null);

  const fetchGroups = async () => {
    const res = await Api.get("groups/sort/remainedTime");
    const deadlineGroups = res.data.payload;
    const randomNum = Math.floor(Math.random() * deadlineGroups.length);
    setDeadlineGroup(deadlineGroups[randomNum]);
  };
  useEffect(() => {
    fetchGroups();
  }, []);

  return (
    <Container>
      <SearchInputForm />
      <SearchContentContainer>
        <SliderContainer isTrendingPage={isTrendingPage}>
          <SearchTrending />
          <SearchCurrent />
        </SliderContainer>
      </SearchContentContainer>
      {!isTrendingPage && (
        <StyledButton
          onClick={() => setIsTrendingPage(true)}
          isTrendingPage={isTrendingPage}
        >
          <FontAwesomeIcon
            icon={faChevronLeft}
            style={{ background: "transparent" }}
          />
        </StyledButton>
      )}
      {isTrendingPage && (
        <StyledButton
          onClick={() => setIsTrendingPage(false)}
          isTrendingPage={isTrendingPage}
        >
          <FontAwesomeIcon
            icon={faChevronRight}
            style={{ background: "transparent" }}
          />
        </StyledButton>
      )}
      {deadlineGroup && (
        <DeadLineContainer>
          <h3>마감 임박</h3>
          <SearchGroupCard
            name={deadlineGroup.groupName}
            image={deadlineGroup.productInfo.images}
            price={deadlineGroup.productInfo.price}
            salePrice={deadlineGroup.productInfo.salePrice}
            discountRate={deadlineGroup.productInfo.discountRate}
            leftParticipants={deadlineGroup.remainedPersonnel}
            deadline={deadlineGroup.deadline}
          />
        </DeadLineContainer>
      )}
    </Container>
  );
};

export default SearchPage;

const DeadLineContainer = styled.div`
  width: 100%;
  height: 30vh;
  background: #f6f6f6;
  padding: 3.5%;
`;

const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: 770px;
  min-width: 360px;
  min-height: 100vh;
  background-color: #ffffff;
  "::-webkit-scrollbar-track" {
    background: none;
  }
  overflow: hidden;
`;

const SearchContentContainer = styled.div`
  @media only screen and (max-width: 400px) {
    width: 300px;
    margin: auto;
    position: relative;
    overflow: hidden;
  }
`;

const SliderContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  transition: all 0.5s ease-in-out;
  @media only screen and (max-width: 400px) {
    justify-content: flex-start;
    width: 300px;
    margin: auto;
    transform: translateX(
      -${(props) => (props.isTrendingPage ? "0px" : "100%")}
    );
  }
`;

const StyledButton = styled.div`
  visibility: hidden;
  pointer-events: none;
  @media only screen and (max-width: 500px) {
    visibility: visible;
    pointer-events: auto;
    position: absolute;
    font-size: 30px;
    top: 270px;
  }
  ${(props) =>
    props.isTrendingPage &&
    css`
      right: 10px;
    `}
  ${(props) =>
    !props.isTrendingPage &&
    css`
      left: 10px;
    `}
`;
