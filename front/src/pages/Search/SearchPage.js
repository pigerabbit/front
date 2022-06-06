import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
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
  const [IsTrendingPage, setIsTrendingPage] = useState(true);
  const [deadlineProduct, setDeadlineProduct] = useState({});
  const slideRef = useRef(null);

  useEffect(() => {
    slideRef.current.style.transition = "all 0.5s ease-in-out";
    slideRef.current.style.transform = `translateX(-${
      IsTrendingPage ? 0 : 1
    }00%)`;
  }, [IsTrendingPage]);

  const fetchProducts = async () => {
    const res = await Api.get("groups/sort/remainedTime");
    const deadlineProducts = res.data.payload;
    const randomNum = Math.floor(Math.random() * deadlineProducts.length);
    setDeadlineProduct(deadlineProducts[randomNum]);
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Container>
      <SearchInputForm />
      <SearchContentContainer>
        <SliderContainer ref={slideRef}>
          <SearchTrending />
          <SearchCurrent />
        </SliderContainer>
      </SearchContentContainer>
      {!IsTrendingPage && (
        <PrevBtn onClick={() => setIsTrendingPage(true)}>
          <FontAwesomeIcon
            icon={faChevronLeft}
            style={{ background: "transparent" }}
          />
        </PrevBtn>
      )}
      {IsTrendingPage && (
        <NextBtn onClick={() => setIsTrendingPage(false)}>
          <FontAwesomeIcon
            icon={faChevronRight}
            style={{ background: "transparent" }}
          />
        </NextBtn>
      )}
      {deadlineProduct && (
        <DeadLineContainer>
          <h3>마감 임박</h3>
          <SearchGroupCard
            name={deadlineProduct.groupName}
            price="10000"
            salePrice="9000"
            discountRate="10"
            leftParticipants={deadlineProduct.remainedPersonnel}
            deadline={deadlineProduct.deadline}
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
  @media only screen and (max-width: 400px) {
    justify-content: flex-start;
    width: 300px;
    margin: auto;
  }
`;

const PrevBtn = styled.div`
  visibility: hidden;
  pointer-events: none;
  @media only screen and (max-width: 500px) {
    visibility: visible;
    pointer-events: auto;
    position: absolute;
    font-size: 30px;
    top: 270px;
    left: 10px;
  }
`;

const NextBtn = styled.div`
  visibility: hidden;
  pointer-events: none;
  @media only screen and (max-width: 500px) {
    visibility: visible;
    pointer-events: auto;
    position: absolute;
    font-size: 30px;
    top: 270px;
    right: 10px;
  }
`;
