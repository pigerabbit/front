import { useState, useEffect } from "react";
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

const Button = ({ isTrending, setIsTrending }) => {
  const icon = isTrending ? faChevronRight : faChevronLeft;

  return (
    <StyledButton
      onClick={() => setIsTrending(!isTrending)}
      isTrendingPage={isTrending}
    >
      <FontAwesomeIcon icon={icon} style={{ background: "transparent" }} />
    </StyledButton>
  );
};

const SearchPage = () => {
  const [isTrending, setIsTrending] = useState(true);
  const [deadlineGroup, setDeadlineGroup] = useState([]);

  const getImminentGroups = async () => {
    const res = await Api.get("groups/sort/remainedTime");
    const deadlineGroups = res.data.payload;
    if (deadlineGroups.length !== 0) {
      const randomNum = Math.floor(Math.random() * deadlineGroups.length);
      setDeadlineGroup(deadlineGroups[randomNum]);
    }
  };
  useEffect(() => {
    getImminentGroups();
  }, []);

  return (
    <Container>
      <SearchInputForm />
      <SearchContentContainer>
        <SliderContainer isTrendingPage={isTrending}>
          <SearchTrending />
          <SearchCurrent />
        </SliderContainer>
      </SearchContentContainer>
      <Button isTrending={isTrending} setIsTrending={setIsTrending} />
      <DeadLineContainer isEmpty={!deadlineGroup}>
        {deadlineGroup.length !== 0 && (
          <>
            <h3>마감 임박</h3>
            <SearchGroupCard group={deadlineGroup} />
          </>
        )}
        {!deadlineGroup && (
          <NoDeadlineGroupContainer>
            <h3> 마감 임박 공동구매 상품이 없습니다</h3>
          </NoDeadlineGroupContainer>
        )}
      </DeadLineContainer>
    </Container>
  );
};

export default SearchPage;

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

const DeadLineContainer = styled.div`
  width: 100%;
  height: 30vh;
  background: #f6f6f6;
  padding: 3.5%;
  > h3 {
    font-size: 20px;
  }
  @media only screen and (max-width: 500px) {
    padding: ${(props) => (props.isEmpty ? "0" : "3.5%")};
    > h3 {
      font-size: 18px;
    }
  }
`;

const NoDeadlineGroupContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  > h3 {
    font-size: 25px;
    color: #969696;
  }
  @media only screen and (max-width: 500px) {
    > h3 {
      font-size: 20px;
    }
  }
`;
